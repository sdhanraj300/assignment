/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fakestoreapi.com', // Correct key
                port: '', // Optional, usually left empty
                pathname: '/**', // Optional, matches all paths under the hostname
            },
        ],
    },
};

export default nextConfig;
