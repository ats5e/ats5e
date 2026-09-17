/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep dev and production artifacts separate so running `next build`
  // while a dev server is active does not corrupt the dev runtime cache.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Kept short because team photos and logos are replaced in place under the same file name.
    minimumCacheTTL: 60 * 60,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
