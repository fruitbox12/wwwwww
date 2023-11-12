/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    async rewrites() {
      return [
        {
          source: '/api/:v1*', // This will match all API requests
          destination: 'http://localhost:3000/api/:v1*', // Proxy to External API
        },
      ];
    },
  };
  
  module.exports = nextConfig;
  
