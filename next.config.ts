
const nextConfig = {
  experimental: {
    turbo: true, // disables Turbopack
  },
   images: {
    domains: ["api.microlink.io"], 
    // whitelist your image host
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'skillicons.dev',
      },
    ],
  },
};

export default nextConfig;


