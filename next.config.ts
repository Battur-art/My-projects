const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Opt into the app router (we'll use /app)
    appDir: true,
  },
  // If you plan to serve images from /public/images, no extra config is needed.
};

export default nextConfig;
