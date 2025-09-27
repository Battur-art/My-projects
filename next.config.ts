const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Opt into the app router (we'll use /app)
    appDir: true,
  },
  // Exclude src/pages from being treated as Next.js pages
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  // If you plan to serve images from /public/images, no extra config is needed.
};

export default nextConfig;
