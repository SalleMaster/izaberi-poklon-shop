import { Metadata } from 'next'
import pageGuard from '@/lib/pageGuard'
import { getPaymentStatus, RequestStatus } from '@/lib/checkout'
import prisma from '@/lib/db'
import { OrderPaymentStatusType, OrderStatusType } from '@prisma/client'
import { redirect } from 'next/navigation'
import { sendOrderEmail } from '@/app/(shop)/_actions/order/actions'
import { Separator } from '@/components/ui/separator'
import { NotificationAlert } from '@/components/custom/NotificationAlert'

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

  const { userId } = await pageGuard({
    callbackUrl: `/placanje/${orderId}/rezultat`,
    adminGuard: false,
  })

  if (!resourcePathParam) {
    return (
      <div className='space-y-5'>
        <h2 className='text-xl font-bold'>Rezultat plaćanja</h2>

        <Separator />

        <NotificationAlert
          title='Došlo je do greške'
          description='Nedostaje putanja resursa za proveru statusa plaćanja.'
          variant='destructive'
        />
      </div>
    )
  }

  const resourcePath = Array.isArray(resourcePathParam)
    ? resourcePathParam[0]
    : resourcePathParam

  const response = await getPaymentStatus(resourcePath)

  console.log('Payment result client:', response)

  if (response.status === RequestStatus.success) {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: OrderStatusType.pending,
        paymentId: response.paymentResult?.id,
        paymentStatus: OrderPaymentStatusType.success,
        paymentDetails: response.paymentResult,
      },
    })

    if (order) {
      await sendOrderEmail(
        order,
        order.billingEmail || order.deliveryEmail || order.pickupEmail || ''
      )
    }

    redirect(`/porudzbina-kreirana/${orderId}`)
  } else {
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: OrderStatusType.draft,
        paymentId: response.paymentResult?.id,
        paymentStatus: OrderPaymentStatusType.failed,
        paymentDetails: response.paymentResult,
      },
    })
  }

  return (
    <div className='space-y-5'>
      <h2 className='text-xl font-bold'>Rezultat plaćanja</h2>

      <Separator />

      <NotificationAlert
        title='Obaveštenje'
        description='Nažalost plaćanje nije uspelo.'
        variant='destructive'
      />
    </div>
  )
}
