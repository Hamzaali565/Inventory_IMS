/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    buildActivity: false, // Disables build activity indicators
  },
  // This disables Fast Refresh
  reactStrictMode: false,
  compiler: {
    reactRemoveProperties: true,
  },
};

export default nextConfig;
