import prisma from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProductForm } from '../../_components/ProductForm'
import { Separator } from '@/components/ui/separator'

type EditProductPageProps = {
  id: string
}

export default async function EditProductPage({ id }: EditProductPageProps) {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: 'desc' },
  })

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      categories: true,
      coverImage: true,
      images: true,
      discount: true,
      imagePersonalizationFields: true,
      textPersonalizationFields: true,
      packageOption: true,
      priceTable: {
        orderBy: { price: 'desc' },
      },
    },
  })

  const discounts = await prisma.discount.findMany({
    orderBy: { createdAt: 'desc' },
  })

  const deliveryFees = await prisma.deliveryFee.findMany({
    orderBy: { fee: 'asc' },
  })

  const packageOptions = await prisma.packageOption.findMany({
    orderBy: { updatedAt: 'desc' },
  })

  return (
    <div className='space-y-5'>
      <h2 className='text-xl font-bold'>Edit</h2>

      <Separator />
      <Card>
        <CardHeader>
          <CardTitle>Edituj proizvod</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm
            categories={categories}
            product={product}
            discounts={discounts}
            deliveryFees={deliveryFees}
            packageOptions={packageOptions}
          />
        </CardContent>
      </Card>
    </div>
  )
}
