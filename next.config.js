/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          // {
          //   source: '/api/daily-share',
          //   destination: 'http://localhost:3000/daily-share',
          // },
          {
            source: '/api/:path*',
            destination: 'http://localhost:3000/:path*',
          },
        ];
    },
}

module.exports = nextConfig
