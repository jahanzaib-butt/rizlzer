/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    domains: ['example.com'],
    unoptimized: true
  },
  output: 'standalone'
};

export default nextConfig;