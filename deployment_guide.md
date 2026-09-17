# Deployment & Migration Guide

This guide outlines the steps required to host the **ATS5E Atlas** project on your own server and migrate the database.

## 1. Backend Configuration

Place the provided `.env` file in the `/backend` directory. Update the following variable to point to your self-hosted MongoDB instance:

```bash
# Update this to your local or server-hosted MongoDB URI
MONGODB_URI=mongodb://[HOST]:[PORT]/ats5e
```

## 2. Authentication Security (Refactored)

The authentication system has been upgraded. Admin credentials are no longer hardcoded in the codebase. 

- **Hashing**: All passwords are now stored using `bcryptjs`.
- **User Model**: An `Admin` user is now stored in the `User` collection in your database.
- **Seeding**: To create the initial admin account and populate the website content, run the seeding script.

## 3. Database Seeding & Setup

Navigate to the `/backend` directory and run:

```bash
npm install
node seed.js
```

**What this does:**
1. Connects to your `MONGODB_URI`.
2. Creates the `User` collection and inserts the initial admin user.
3. Populates all data collections (Solutions, Insights, Case Studies, Partners, Team).
4. Sets the default Homepage configuration.

## 4. Frontend Connectivity

Ensure there is a `.env.local` file in the **root project directory** with the following content:

```bash
NEXT_PUBLIC_API_BASE_URL=http://your-server-ip:5001
```

This variable tells the Next.js frontend where the API is located.

Optionally set the public site URL (used for canonical URLs, the sitemap and social previews). Defaults to `https://ats5e.com`:

```bash
NEXT_PUBLIC_SITE_URL=https://ats5e.com
```

Pages fetch CMS content on the server and cache it for 60 seconds, so admin edits can take up to a minute to appear. This requires running the production server with `npm run build && npm start` (not a static export).

### Contact form via Formspree (frontend `.env.local`)

The contact form is delivered by Formspree. Set the endpoint in the root `.env.local` **before** running `npm run build` (it is inlined at build time):

```bash
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/mzezbgqv
```

If this variable is unset the form falls back to the backend `POST /api/contact` endpoint described below.

### Contact form fallback, CORS and email (backend `.env`)

The contact form posts to `POST /api/contact`. Every enquiry is stored in MongoDB (`contactsubmissions` collection; admins can list them via `GET /api/contact` with a valid token). To also receive enquiries by email, add SMTP settings to `backend/.env`:

```bash
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
CONTACT_TO_EMAIL=info@ats5e.com
CONTACT_FROM_EMAIL=website@ats5e.com

# Comma-separated list of origins allowed to call the API. Leave unset in local development.
CORS_ORIGINS=https://ats5e.com,https://www.ats5e.com
```

The contact and login endpoints are rate limited per IP. The backend trusts one proxy hop (Nginx) — make sure Nginx forwards `X-Forwarded-For`.

## 5. Verification

1. Start the backend: `npm start` (from `/backend`)
2. Start the frontend: `npm run dev` or `npm run build && npm start` (from root)
3. Log in to the admin panel at `/admin` using the credentials provided in the `.env` file.

---

### Prevent Data Loss
If you need to manually import data, refer to the `database_export.zip` which contains JSON dumps of all collections.
