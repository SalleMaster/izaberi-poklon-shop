import prisma from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProductForm } from '../_components/ProductForm'

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    where: { active: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className='space-y-10'>
      <h2 className='text-xl font-bold'>Novi Proizvod</h2>
      <Card>
        <CardHeader>
          <CardTitle>Kreiraj proizvod</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm categories={categories} />
        </CardContent>
      </Card>
    </div>
  )
}
