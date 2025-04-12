/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/daily-share',
            destination: 'http://localhost:3000/daily-share',
          },
        ];
    },
}

module.exports = nextConfig
