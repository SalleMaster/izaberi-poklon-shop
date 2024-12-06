'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { loggedInActionGuard } from '@/lib/actionGuard'
import {
  cartOrderSchema,
  CartOrderValues,
} from '../../cart/_components/cart-order-form/validation'
import { updateCartOverviewData } from '../cart/actions'

export async function cartCreateOrder(values: CartOrderValues) {
  try {
    const { userId } = await loggedInActionGuard()

    const {
      deliveryType,
      paymentType,
      selectedDeliveryAddressId,
      selectedBillingAddressId,
      pickupName,
      pickupPhone,
      pickupEmail,
    } = cartOrderSchema.parse(values)

    let deliveryAddress = null
    let billingAddress = null

    if (selectedDeliveryAddressId) {
      const selectedDeliveryAddress = await prisma.deliveryAddress.findUnique({
        where: {
          id: selectedDeliveryAddressId,
        },
      })

      if (!selectedDeliveryAddress) {
        throw new Error('Adresa dostave nije pronađena.')
      } else {
        deliveryAddress = selectedDeliveryAddress
        billingAddress = selectedDeliveryAddress
      }
    }

    if (selectedBillingAddressId) {
      billingAddress = await prisma.deliveryAddress.findUnique({
        where: {
          id: selectedBillingAddressId,
        },
      })

      if (!billingAddress) {
        throw new Error('Adresa računa nije pronađena.')
      }
    }

    const cart = await prisma.cart.findFirst({
      where: {
        userId,
      },
      include: {
        coupon: true,
        items: {
          include: {
            product: {
              include: {
                coverImage: true,
              },
            },
            textPersonalizations: true,
            imagePersonalizations: true,
          },
        },
      },
    })

    if (!cart) {
      throw new Error('Korpa nije pronađena.')
    }

    await prisma.order.create({
      data: {
        deliveryType,
        paymentType,
        pickupName,
        pickupPhone,
        pickupEmail,
        deliveryName: deliveryAddress?.name ?? '',
        deliveryAddress: deliveryAddress?.address ?? '',
        deliveryCity: deliveryAddress?.city ?? '',
        deliveryZip: deliveryAddress?.zip ?? '',
        deliveryPhone: deliveryAddress?.phone ?? '',
        deliveryEmail: deliveryAddress?.email ?? '',
        deliveryNote: deliveryAddress?.note ?? '',
        billingName: billingAddress?.name ?? '',
        billingAddress: billingAddress?.address ?? '',
        billingCity: billingAddress?.city ?? '',
        billingZip: billingAddress?.zip ?? '',
        billingPhone: billingAddress?.phone ?? '',
        billingEmail: billingAddress?.email ?? '',
        billingNote: billingAddress?.note ?? '',
        cart,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })

    // Clear the cart
    await prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
      },
    })
    await updateCartOverviewData({ userId })

    return {
      status: 'success',
      message: 'Narudžbina kreirana.',
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: 'fail',
        message: error.message,
      }
    } else {
      throw error
    }
  } finally {
    revalidatePath('/cart')
  }
}

const cart = {
  id: 'cm4892oz90002sv5ayt7rk65n',
  items: [
    {
      id: 'cm4b4trfp000hmpppq9tkx5jt',
      price: 2550,
      cartId: 'cm4892oz90002sv5ayt7rk65n',
      product: {
        id: 'cm4b29odu0002mpppv61k1yjn',
        code: '0001',
        name: 'Proizvod 1',
        price: 1500,
        inStock: true,
        delivery: 'fast',
        material: 'Drvo',
        createdAt: '2024-12-05T08:34:38.131Z',
        updatedAt: '2024-12-05T08:34:38.131Z',
        coverImage: {
          id: 'cm4b29o200001mppp3z53renk',
          key: '28c1060a-5d2a-4e1f-99f8-98a844dfc743-product-sample-1.png',
          url: 'https://izaberi-poklon-shop-development-bucket-salle.s3.eu-north-1.amazonaws.com/28c1060a-5d2a-4e1f-99f8-98a844dfc743-product-sample-1.png',
          name: 'product-sample-1.png',
          type: 'image/png',
          userId: 'cm4731wbp0000ziexvadngi16',
          bannerId: null,
          createdAt: '2024-12-05T08:34:37.705Z',
          updatedAt: '2024-12-05T08:34:38.131Z',
          categoryId: null,
          productCoverId: 'cm4b29odu0002mpppv61k1yjn',
          productImagesId: null,
          deliveryServiceId: null,
          imagePersonalizationId: null,
        },
        dimensions: '15x20cm',
        discountId: 'discount-id-1',
        description:
          'Koristeći specijalnu površinu napravljenu od mikrovlakana, G31 je dizajniran da obezbedi superiornu kontrolu pokreta i udobnost, istovremeno sa poboljšanim odzivom senzora\nZbog svoje veličine, G31 se posebno preporučuje onima koji preferiraju visoku osetljivost miša\nVodootpornost',
        packageOptionId: null,
        personalization: 'Gravura',
      },
      fontType: 'cyrillic',
      quantity: 2,
      createdAt: '2024-12-05T09:46:14.437Z',
      productId: 'cm4b29odu0002mpppv61k1yjn',
      updatedAt: '2024-12-05T09:46:14.437Z',
      textPersonalizations: [],
      imagePersonalizations: [],
    },
    {
      id: 'cm4b4wmbk000jmppprg800qja',
      price: 1275,
      cartId: 'cm4892oz90002sv5ayt7rk65n',
      product: {
        id: 'cm4b29odu0002mpppv61k1yjn',
        code: '0001',
        name: 'Proizvod 1',
        price: 1500,
        inStock: true,
        delivery: 'fast',
        material: 'Drvo',
        createdAt: '2024-12-05T08:34:38.131Z',
        updatedAt: '2024-12-05T08:34:38.131Z',
        coverImage: {
          id: 'cm4b29o200001mppp3z53renk',
          key: '28c1060a-5d2a-4e1f-99f8-98a844dfc743-product-sample-1.png',
          url: 'https://izaberi-poklon-shop-development-bucket-salle.s3.eu-north-1.amazonaws.com/28c1060a-5d2a-4e1f-99f8-98a844dfc743-product-sample-1.png',
          name: 'product-sample-1.png',
          type: 'image/png',
          userId: 'cm4731wbp0000ziexvadngi16',
          bannerId: null,
          createdAt: '2024-12-05T08:34:37.705Z',
          updatedAt: '2024-12-05T08:34:38.131Z',
          categoryId: null,
          productCoverId: 'cm4b29odu0002mpppv61k1yjn',
          productImagesId: null,
          deliveryServiceId: null,
          imagePersonalizationId: null,
        },
        dimensions: '15x20cm',
        discountId: 'discount-id-1',
        description:
          'Koristeći specijalnu površinu napravljenu od mikrovlakana, G31 je dizajniran da obezbedi superiornu kontrolu pokreta i udobnost, istovremeno sa poboljšanim odzivom senzora\nZbog svoje veličine, G31 se posebno preporučuje onima koji preferiraju visoku osetljivost miša\nVodootpornost',
        packageOptionId: null,
        personalization: 'Gravura',
      },
      fontType: 'cyrillic',
      quantity: 1,
      createdAt: '2024-12-05T09:48:27.777Z',
      productId: 'cm4b29odu0002mpppv61k1yjn',
      updatedAt: '2024-12-05T09:48:27.777Z',
      textPersonalizations: [],
      imagePersonalizations: [],
    },
  ],
  coupon: null,
  userId: 'cm4731wbp0000ziexvadngi16',
  couponId: null,
  discount: 0,
  createdAt: '2024-12-03T09:21:51.092Z',
  updatedAt: '2024-12-05T09:48:28.034Z',
  totalPrice: 3825,
  onlinePrice: 3825,
}
