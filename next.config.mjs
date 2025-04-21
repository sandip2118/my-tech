/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { pathname: "/**", protocol: "https", hostname: "picsum.photos" },
      { pathname: "/**", protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
