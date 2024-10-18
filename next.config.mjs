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
  async rewrites() {
    return [
      {
        source: '/admin/kategorije',
        destination: '/dashboard/categories',
      },
      {
        source: '/admin/kurirske-sluzbe',
        destination: '/dashboard/delivery-services',
      },
      {
        source: '/admin/popusti',
        destination: '/dashboard/discounts',
      },
      {
        source: '/admin/proizvodi',
        destination: '/dashboard/products',
      },
      {
        source: '/admin/proizvodi/novi',
        destination: '/dashboard/products/new',
      },
      {
        source: '/admin/proizvodi/:id/edit',
        destination: '/dashboard/products/:id/edit',
      },
      {
        source: '/admin/baneri',
        destination: '/dashboard/banners',
      },
    ]
  },
}

export default nextConfig
