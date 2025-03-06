/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname:
          'izaberi-poklon-shop-development-bucket-salle.s3.eu-north-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname:
          'izaberi-poklon-shop-production-bucket-salle.s3.eu-north-1.amazonaws.com',
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
        source: '/admin/porudzbine',
        destination: '/dashboard/orders',
      },
      {
        source: '/admin/recenzije',
        destination: '/dashboard/ratings',
      },
      {
        source: '/profil/porudzbine',
        destination: '/dashboard/my-orders',
      },
      {
        source: '/profil/moji-podaci',
        destination: '/dashboard/profile',
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
        source: '/porudzbina-kreirana/:id',
        destination: '/order-created/:id',
      },
      {
        source: '/korpa',
        destination: '/cart',
      },
      {
        source: '/profil/adresa-dostave',
        destination: '/dashboard/delivery-address',
      },
      {
        source: '/admin/porudzbine/:id',
        destination: '/dashboard/orders/:id',
      },
      {
        source: '/profil/porudzbine/:id',
        destination: '/dashboard/orders/:id',
      },
      {
        source: '/kontakt',
        destination: '/contact',
      },
      {
        source: '/nacin-isporuke',
        destination: '/delivery-info',
      },
      {
        source: '/politika-privatnosti',
        destination: '/privacy-policy',
      },
      {
        source: '/reklamacije',
        destination: '/complaints',
      },
      {
        source: '/uslovi-koriscenja',
        destination: '/terms-of-use',
      },
      {
        source: '/povracaj-proizvoda',
        destination: '/product-return',
      },
      {
        source: '/placanje/:orderId',
        destination: '/payment/:orderId',
      },
      {
        source: '/placanje/:orderId/rezultat',
        destination: '/payment/:orderId/result',
      },
    ]
  },
}

export default nextConfig
