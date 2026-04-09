/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep dev and production artifacts separate so running `next build`
  // while a dev server is active does not corrupt the dev runtime cache.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
};

export default nextConfig;
