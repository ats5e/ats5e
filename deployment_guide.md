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

## 5. Verification

1. Start the backend: `npm start` (from `/backend`)
2. Start the frontend: `npm run dev` or `npm run build && npm start` (from root)
3. Log in to the admin panel at `/admin` using the credentials provided in the `.env` file.

---

### Prevent Data Loss
If you need to manually import data, refer to the `database_export.zip` which contains JSON dumps of all collections.
