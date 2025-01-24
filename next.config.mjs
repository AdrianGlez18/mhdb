/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',                   
              },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'ui-avatars.com',
                port: ''
            }
        ]
    },
    eslint: {
        // TODO: REMOVE. ONLY FOR DEPLOY TESTING
        ignoreDuringBuilds: true,
      },
};

export default nextConfig;
