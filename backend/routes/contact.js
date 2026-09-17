const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const models = require('../models');
const auth = require('../middleware/auth');

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 120, company: 160, email: 200, phone: 40, message: 5000 };

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { msg: 'Too many enquiries from this address. Please try again later or email us directly.' },
});

const clean = (value, max) => String(value ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);

let transporter = null;
const getTransporter = () => {
  if (!process.env.SMTP_HOST) return null;
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT || 587);
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
    });
  }
  return transporter;
};

// POST a new enquiry (public)
router.post('/', contactLimiter, async (req, res) => {
  try {
    const body = req.body || {};

    // Honeypot: real visitors never fill this hidden field. Pretend success so bots move on.
    if (clean(body.website, 200)) {
      return res.status(201).json({ ok: true });
    }

    const enquiry = {
      name: clean(body.name, LIMITS.name),
      company: clean(body.company, LIMITS.company),
      email: clean(body.email, LIMITS.email).toLowerCase(),
      phone: clean(body.phone, LIMITS.phone),
      message: String(body.message ?? '').trim().slice(0, LIMITS.message),
      source: clean(body.source, 200),
    };

    if (!EMAIL_PATTERN.test(enquiry.email)) {
      return res.status(400).json({ msg: 'Please provide a valid email address.' });
    }
    if (enquiry.message.length < 10) {
      return res.status(400).json({ msg: 'Please tell us a little more about your enquiry.' });
    }

    const saved = await models.ContactSubmission.create(enquiry);

    const mailer = getTransporter();
    if (mailer) {
      try {
        await mailer.sendMail({
          from: process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER,
          to: process.env.CONTACT_TO_EMAIL || 'info@ats5e.com',
          replyTo: enquiry.email,
          subject: enquiry.company ? `ATS5E enquiry from ${enquiry.company}` : 'ATS5E website enquiry',
          text: [
            `Name: ${enquiry.name || '-'}`,
            `Company: ${enquiry.company || '-'}`,
            `Email: ${enquiry.email}`,
            `Phone: ${enquiry.phone || '-'}`,
            `Page: ${enquiry.source || '-'}`,
            '',
            enquiry.message,
          ].join('\n'),
        });
        saved.emailed = true;
        await saved.save();
      } catch (mailErr) {
        // The enquiry is already stored, so a mail failure must not fail the request.
        console.error('Contact email failed:', mailErr.message);
      }
    }

    res.status(201).json({ ok: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Something went wrong. Please email us directly.' });
  }
});

// GET all enquiries (admin only)
router.get('/', auth, async (req, res) => {
  try {
    const items = await models.ContactSubmission.find({}).sort({ createdAt: -1 }).limit(500);
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
