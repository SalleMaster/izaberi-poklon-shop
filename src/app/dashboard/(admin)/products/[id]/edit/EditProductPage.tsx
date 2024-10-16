import prisma from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProductForm } from '../../_components/ProductForm'

type EditProductPageProps = {
  id: string
}

export default async function EditProductPage({ id }: EditProductPageProps) {
  const categories = await prisma.category.findMany({
    where: { active: true },
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
    },
  })

  const discounts = await prisma.discount.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className='space-y-10'>
      <h2 className='text-xl font-bold'>Edit</h2>
      <Card>
        <CardHeader>
          <CardTitle>Edituj proizvod</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm
            categories={categories}
            product={product}
            discounts={discounts}
          />
        </CardContent>
      </Card>
    </div>
  )
}
