/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'placehold.co' },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  webpack: (config, { isServer }) => {
    // Ignore jspdf's optional canvas/core-js peer deps that cause issues on
    // Windows OneDrive installs where node_modules was partially synced.
    config.resolve.alias = {
      ...config.resolve.alias,
      'core-js/modules/es.promise.js': false,
      'core-js/modules/es.string.match.js': false,
      'core-js/modules/es.string.replace.js': false,
      'core-js/modules/es.string.starts-with.js': false,
      'core-js/modules/es.array.iterator.js': false,
      'core-js/modules/es.object.to-string.js': false,
    };
    return config;
  },
};

export default nextConfig;
