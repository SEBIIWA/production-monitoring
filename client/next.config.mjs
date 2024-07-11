/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'preview.keenthemes.com',
      },
      {
        protocol: 'https',
        hostname: 'amira-server.onrender.app',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
    ],
  },
}

export default nextConfig;
