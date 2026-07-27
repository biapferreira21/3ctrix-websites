/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/websites",
  reactStrictMode: true,
  poweredByHeader: false,
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
