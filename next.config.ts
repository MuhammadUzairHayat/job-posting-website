import { NextConfig } from 'next';
import { Configuration } from 'webpack';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com', "media.istockphoto.com", "ui-avatars.com"],
  },
  webpack: (config: Configuration) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        fs: false,
        path: false,
      },
    };
    return config;
  },
  transpilePackages: ['react-quill'],
};

export default nextConfig;
