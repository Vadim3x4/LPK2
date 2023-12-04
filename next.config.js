/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_DEV_URL: 'http://localhost:8000/api/v1/',
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
