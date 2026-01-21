/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: '*.supabase.co',
            },
        ],
    },
    async rewrites() {
        return [
          // {
          //   source: '/api/daily-share',
          //   destination: 'http://localhost:3000/daily-share',
          // },
          {
            source: '/api/:path*',
            destination: 'http://localhost:3003/api/:path*',
          },
        ];
    },
}

module.exports = nextConfig
