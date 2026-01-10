/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  
  webpack(config, options) {
    // Module Federation configuration will be added here
    // Currently disabled due to compatibility issues with Next.js 15.5
    // See docs/MICROFRONTENDS.md for setup instructions
    
    return config;
  },
};

module.exports = nextConfig;
