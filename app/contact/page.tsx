"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fadeUp } from "@/lib/motion";

export default function ContactPage() {
  const [form, setForm] = useState({ company: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-44 pb-20 px-6">
        <div
          aria-hidden className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle,#148be6,transparent 70%)", filter: "blur(100px)" }}
        />
        <div className="max-w-7xl mx-auto">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
            <span className="text-[10px] tracking-[0.35em] uppercase text-zinc-600 font-medium block mb-6">Get In Touch</span>
          </motion.div>
          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
            className="text-[clamp(3rem,8vw,7.5rem)] font-black uppercase leading-[0.88] tracking-[-0.05em] mb-8"
          >
            CONTACT<br /><span style={{ color: "#148be6" }}>US.</span>
          </motion.h1>
          <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible"
            className="text-sm font-medium text-zinc-500 max-w-md leading-relaxed tracking-[0.02em]"
          >
            Ready to transform your business with intelligent technology solutions? Get in touch with our team to start the conversation.
          </motion.p>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-16 px-6 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Office Details */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-[10px] tracking-[0.3em] uppercase font-bold mb-8" style={{ color: "#148be6" }}>Our Office</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-4 h-4 text-zinc-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-black uppercase tracking-[-0.02em] mb-1">Dubai, UAE</p>
                  <p className="text-[11px] text-zinc-600 leading-relaxed font-medium">
                    Meydan Grandstand, 6th Floor<br />
                    Meydan Road, Dubai<br />
                    United Arab Emirates
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-4 h-4 text-zinc-600 shrink-0" />
                <a href="tel:+971585223191" className="text-[11px] text-zinc-500 hover:text-white transition-colors font-medium tracking-[0.04em]">
                  +971 58 522 3191
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-4 h-4 text-zinc-600 shrink-0" />
                <a href="mailto:info@ats5e.com" className="text-[11px] text-zinc-500 hover:text-white transition-colors font-medium tracking-[0.04em]">
                  info@ats5e.com
                </a>
              </div>
            </div>

            <div className="mt-16 rounded-2xl p-8"
              style={{ background: "linear-gradient(135deg,rgba(20,139,230,0.06),rgba(20,139,230,0.02))", border: "1px solid rgba(20,139,230,0.15)" }}
            >
              <p className="text-[11px] text-zinc-500 leading-relaxed italic font-medium">
                &ldquo;We work with a select group of clients to ensure every engagement receives senior-level attention and an unwavering commitment to success.&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                <CheckCircle className="w-12 h-12 mb-6" style={{ color: "#148be6" }} />
                <h3 className="text-2xl font-black uppercase tracking-[-0.03em] mb-3">Message Sent.</h3>
                <p className="text-sm text-zinc-500 font-medium">Your message has been sent successfully. We'll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-[10px] tracking-[0.3em] uppercase font-bold mb-8" style={{ color: "#148be6" }}>Send a Message</h2>
                {[
                  { id: "company", label: "Company Name", placeholder: "Enter your company name", type: "text" },
                  { id: "phone",   label: "Contact Number", placeholder: "Enter your contact number", type: "tel"  },
                ].map((field) => (
                  <div key={field.id}>
                    <label className="block text-[10px] tracking-[0.22em] uppercase text-zinc-600 font-medium mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.id as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                      required
                      className="w-full px-5 py-3.5 rounded-xl text-sm font-medium text-white placeholder-zinc-700 outline-none transition-all duration-300 focus:border-[#148be6]/50"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-[10px] tracking-[0.22em] uppercase text-zinc-600 font-medium mb-2">
                    Project or Inquiry
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell us about your project or inquiry"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    className="w-full px-5 py-3.5 rounded-xl text-sm font-medium text-white placeholder-zinc-700 outline-none transition-all duration-300 resize-none focus:border-[#148be6]/50"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-full text-[11px] font-bold tracking-[0.14em] uppercase text-white transition-all duration-300 hover:shadow-glow-blue-sm"
                  style={{ background: "#148be6" }}
                >
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
