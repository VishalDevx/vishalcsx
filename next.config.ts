
const nextConfig = {
  experimental: {
    turbo: true, // disables Turbopack
  },
   images: {
    domains: ["api.microlink.io"], // whitelist your image host
  },
};

export default nextConfig;
