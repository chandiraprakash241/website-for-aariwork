/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.minimize = false;
    }
    return config;
  }
};

export default nextConfig;
