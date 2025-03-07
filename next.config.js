/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Disable server components and API routes for static export
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@payloadcms/db-mongodb'],
  },
  webpack: (config) => {
    // Решаем проблему с terser-webpack-plugin
    config.optimization = {
      ...config.optimization,
      minimize: false
    }
    return config
  },
  // Add redirects for API routes in static build
  async redirects() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/:path*',
        permanent: true,
      },
    ]
  }
};

module.exports = nextConfig;
