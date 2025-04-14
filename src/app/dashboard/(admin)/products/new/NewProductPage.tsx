import prisma from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProductForm } from '../_components/ProductForm'

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: 'desc' },
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
    <div className='space-y-10'>
      <Card>
        <CardHeader>
          <CardTitle>Kreiraj proizvod</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm
            categories={categories}
            discounts={discounts}
            deliveryFees={deliveryFees}
            packageOptions={packageOptions}
          />
        </CardContent>
      </Card>
    </div>
  )
}
