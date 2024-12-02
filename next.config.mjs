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
      {
        source: '/admin/kuponi',
        destination: '/dashboard/coupons',
      },
      {
        source: '/admin/postarine',
        destination: '/dashboard/delivery-fees',
      },
      {
        source: '/admin/poklon-pakovanja',
        destination: '/dashboard/package-options',
      },
      {
        source: '/pokloni',
        destination: '/products',
      },
      {
        source: '/pokloni/:id',
        destination: '/products/:id',
      },
      {
        source: '/korpa',
        destination: '/cart',
      },
      {
        source: '/profil/adresa-dostave',
        destination: '/dashboard/delivery-address',
      },
    ]
  },
}

export default nextConfig
