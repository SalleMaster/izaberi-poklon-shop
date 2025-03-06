import { Metadata } from 'next'
import pageGuard from '@/lib/pageGuard'
import { getPaymentStatus, RequestStatus } from '@/lib/checkout'
import prisma from '@/lib/db'
import { OrderPaymentStatusType } from '@prisma/client'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Rezultat plaćanja',
  description: 'Rezultat plaćanja',
}

type PageProps = {
  params: Promise<{ orderId: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page(props: PageProps) {
  const params = await props.params
  const searchParams = await props.searchParams

  const { orderId } = params
  const resourcePathParam = searchParams.resourcePath

  await pageGuard({
    callbackUrl: `/placanje/${orderId}/rezultat`,
    adminGuard: false,
  })

  if (!resourcePathParam) {
    return (
      <div className='space-y-5 group'>
        <h2 className='text-xl font-bold'>Greška u plaćanju</h2>
        <p>Nedostaje putanja resursa za proveru statusa plaćanja.</p>
      </div>
    )
  }

  const resourcePath = Array.isArray(resourcePathParam)
    ? resourcePathParam[0]
    : resourcePathParam

  const response = await getPaymentStatus(resourcePath)

  console.log('Payment result client:', response)

  if (response.status === RequestStatus.success) {
    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentId: response?.paymentResult?.id,
        paymentStatus: OrderPaymentStatusType.success,
        paymentDetails: response.paymentResult,
      },
    })

    redirect(`/porudzbina-kreirana/${orderId}`)
  }

  return (
    <div className='space-y-5 group'>
      <h2 className='text-xl font-bold'>Rezultat plaćanja</h2>

      {response.status === RequestStatus.fail ? (
        <p>Nazalost placanje nije uspelo</p>
      ) : null}
    </div>
  )
}
