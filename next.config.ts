const nextConfig = {
  images: {
    domains: ["api.microlink.io"],
images: {
    domains: ["github.com"],
  },
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "skillicons.dev",
      },
      {
        protocol: "https",
        hostname: "ghchart.rshah.org",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
