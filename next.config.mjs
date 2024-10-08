/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname:
          'izaberi-poklon-shop-development-bucket-salle.s3.eu-north-1.amazonaws.com',
      },
    ],
  },
}

export default nextConfig
