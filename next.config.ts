/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Keep Strict Mode enabled
  images: {
    domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com"],
  },
  // Add webpack configuration for ReactQuill
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
  // Transpile ReactQuill for better compatibility
  transpilePackages: ['react-quill'],
};

module.exports = nextConfig;