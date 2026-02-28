import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'
import { OrderInformation } from './components/OrderInformation'
import {
  Order,
  OrderPaymentStatusType,
  OrderPaymentType,
} from '@/generated/prisma'
import { shopInfo } from '@/lib/consts'
import { EmailHeader } from './components/EmailHeader'
import { EmailFooter } from './components/EmailFooter'

type NewOrderEmailProps = {
  order: Order
}

NewOrderEmail.PreviewProps = {
  order: {
    id: 'cm5uvydjo00044412i0ii6irr',
    orderNumber: '0DDBE531',
    termsAccepted: true,
    shippingNumber: '',
    deliveryType: 'pickup',
    paymentType: OrderPaymentType.card,
    status: 'pending',
    mediaRemoved: false,
    paymentId: '8ac7a4a09583193e0195848e95b25e43',
    paymentStatus: OrderPaymentStatusType.success,
    paymentDetails: '',
    paymentAuthorizationCode: '123456789',
    paymentStatusCode: '00',
    paymentTimestamp: '2025-01-13T10:12:59.028Z',
    paymentAmount: '700',
    paymentCurrency: 'RSD',
    paymentBrand: 'Visa',
    checkoutId: 'D5AC0D88667C0C3F61A3E71D047E9864.uat01-vm-tx03',
    cart: {
      id: 'cm5uvxsyb000144126x8rtapw',
      items: [
        {
          id: 'cm5uvxthk000344128bpwb7ol',
          price: 700,
          cartId: 'cm5uvxsyb000144126x8rtapw',
          product: {
            id: 'cm5nrksx1001l14ouhuwt4zt7',
            code: '0012',
            name: 'Proizvod 12',
            price: 700,
            inStock: true,
            delivery: 'fast',
            material: 'Drvo',
            trending: true,
            createdAt: '2025-01-08T10:36:04.070Z',
            updatedAt: '2025-01-08T10:36:04.070Z',
            coverImage: {
              id: 'cm5nrkskm001k14ouicw2zntr',
              key: '699fbe08-1ace-4ddf-8905-cbfeff16e369-product-sample-2.png',
              url: 'https://izaberi-poklon-shop-development-bucket-salle.s3.eu-north-1.amazonaws.com/699fbe08-1ace-4ddf-8905-cbfeff16e369-product-sample-2.png',
              name: 'product-sample-2.png',
              type: 'image/png',
              userId: 'cm5mu5g3j000714ouipzfyss8',
              createdAt: '2025-01-08T10:36:03.622Z',
              updatedAt: '2025-01-08T10:36:04.070Z',
              categoryId: null,
              productCoverId: 'cm5nrksx1001l14ouhuwt4zt7',
              productImagesId: null,
              deliveryServiceId: null,
              mobileBannerImageId: null,
              desktopBannerImageId: null,
              imagePersonalizationId: null,
            },
            dimensions: '10x10cm',
            discountId: null,
            description: '-',
            packageOptionId: null,
            personalization: 'Gravura',
          },
          fontType: 'cyrillic',
          quantity: 1,
          createdAt: '2025-01-13T10:12:33.032Z',
          productId: 'cm5nrksx1001l14ouhuwt4zt7',
          updatedAt: '2025-01-13T10:12:33.032Z',
          deliveryFee: 350,
          textPersonalizations: [],
          imagePersonalizations: [],
          packageOptionSelected: false,
        },
      ],
      coupon: null,
      userId: 'cm5mu5g3j000714ouipzfyss8',
      couponId: null,
      discount: 0,
      createdAt: '2025-01-13T10:12:32.338Z',
      updatedAt: '2025-01-13T10:12:33.338Z',
      totalPrice: 700,
      deliveryFee: 350,
      onlinePrice: 700,
      totalPriceWithDeliveryFee: 1050,
    },
    deliveryName: '',
    deliveryAddress: '',
    deliveryCity: '',
    deliveryZip: '',
    deliveryPhone: '',
    deliveryEmail: '',
    deliveryNote: '',
    pickupName: 'Saša Radovanović',
    pickupPhone: '6112312312',
    pickupEmail: 'salle90ar@gmail.com',
    billingName: '',
    billingAddress: '',
    billingCity: '',
    billingZip: '',
    billingPhone: '',
    billingEmail: '',
    billingNote: '',
    deliveryServiceName: '',
    orderOnlinePrice: 700,
    orderDiscount: 0,
    orderDeliveryFee: 0,
    orderTotalPrice: 700,
    userId: 'cm5mu5g3j000714ouipzfyss8',
    createdAt: new Date('2025-01-13T10:12:59.028Z'),
    updatedAt: new Date('2025-01-13T10:12:59.028Z'),
  },
} satisfies NewOrderEmailProps

export default function NewOrderEmail({ order }: NewOrderEmailProps) {
  return (
    <Html>
      <Preview>Nova porudžbina</Preview>
      <Tailwind>
        <Head />
        <Body className='font-sans bg-white'>
          <Container className='max-w-xl'>
            <EmailHeader />
            <Section>
              <Text className='font-semibold'>
                Kreirana je nova porudžbina.
              </Text>
              <Text>
                Poručioc:{' '}
                {order.billingName || order.pickupName || order.deliveryName},
              </Text>
              <Text>
                Porudžbina je evidentirana pod brojem{' '}
                <span className='font-semibold'>{order.orderNumber}</span>.
              </Text>
            </Section>
            <OrderInformation order={order} isForAdmin={true} />
            <EmailFooter />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
