/** @type {import('next').NextConfig} */
<<<<<<< HEAD
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.example.com/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
=======
const nextConfig = {}

module.exports = nextConfig
>>>>>>> 905c9c7f29a6fee09c93efc774d218ea876bc0ac
