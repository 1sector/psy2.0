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
    serverComponentsExternalPackages: ['@payloadcms/db-mongodb', 'payload'],
  },
  webpack: (config) => {
    // Отключаем минификацию для решения проблемы с terser и uglify
    config.optimization = {
      minimize: false
    }
    
    // Добавляем fallback для node.js модулей
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
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
