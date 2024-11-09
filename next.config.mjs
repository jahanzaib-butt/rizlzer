/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true
  },
  output: 'export',
  distDir: 'out',
  trailingSlash: true
};

export default nextConfig;