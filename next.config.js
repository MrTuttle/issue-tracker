// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "referred-policy", value: "no-referrer" }],
      },
    ];
  },
};

module.exports = nextConfig;
