// import { deleteMediaFromS3 } from '@/lib/actions'
import { freeShippingThreshold } from '@/lib/consts'
import { DiscountType, PrismaClient } from '@prisma/client'
import { subDays, format } from 'date-fns'
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'

// Create a dedicated Prisma instance for this script
const prisma = new PrismaClient()

const s3 = new S3Client({
  region: process.env.AWS_S3_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

async function updateCartOverviewData({ userId }: { userId: string }) {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: true, coupon: true },
  })

  if (cart) {
    const allItemsPrice = cart.items.reduce((acc, item) => acc + item.price, 0)
    const deliveryFee =
      cart.items.sort((a, b) => b.deliveryFee - a.deliveryFee)[0]
        ?.deliveryFee || 0
    const onlinePrice = allItemsPrice
    let totalPrice = allItemsPrice
    let totalPriceWithDeliveryFee =
      allItemsPrice > freeShippingThreshold
        ? allItemsPrice
        : allItemsPrice + deliveryFee
    let discount = 0

    if (cart.coupon) {
      const isCouponExpired = cart.coupon.expiresAt < new Date()
      const isCouponActive = cart.coupon.active
      const isCouponAvailable = cart.coupon.used < cart.coupon.available
      const isMinCartValue = allItemsPrice >= cart.coupon.cartValue

      const couponConditions =
        !isCouponExpired &&
        isCouponActive &&
        isCouponAvailable &&
        isMinCartValue

      if (!couponConditions) {
        await prisma.cart.update({
          where: { userId },
          data: {
            coupon: {
              disconnect: true,
            },
          },
        })
      }

      if (couponConditions && cart.coupon.discountType === DiscountType.fixed) {
        totalPrice = allItemsPrice - cart.coupon.discount
        totalPriceWithDeliveryFee =
          totalPrice > freeShippingThreshold
            ? totalPrice
            : totalPrice + deliveryFee
        discount = cart.coupon.discount
      } else if (
        couponConditions &&
        cart.coupon.discountType === DiscountType.percentage
      ) {
        totalPrice =
          allItemsPrice - (allItemsPrice * cart.coupon.discount) / 100
        totalPriceWithDeliveryFee =
          totalPrice > freeShippingThreshold
            ? totalPrice
            : totalPrice + deliveryFee
        discount = (allItemsPrice * cart.coupon.discount) / 100
      }
    }

    await prisma.cart.update({
      where: { userId },
      data: {
        onlinePrice,
        totalPrice,
        discount,
        deliveryFee: totalPrice > freeShippingThreshold ? 0 : deliveryFee,
        totalPriceWithDeliveryFee,
      },
    })
  }
}

async function deleteMediasFromS3(keys: string[]) {
  await Promise.all(
    keys.map(async (key) => {
      const deleteParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: key,
      }

      await s3.send(new DeleteObjectCommand(deleteParams))
    })
  )
}

async function cleanupCartItems(): Promise<void> {
  const currentDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
  const twoDaysAgo = subDays(new Date(), 2)
  const formattedDate = format(twoDaysAgo, 'yyyy-MM-dd HH:mm:ss')

  console.log(
    `[${currentDate}] Starting cleanup of cart items older than ${formattedDate}`
  )

  try {
    // Find all cart items older than two days
    const oldCartItems = await prisma.cartItem.findMany({
      where: {
        updatedAt: {
          lt: twoDaysAgo,
        },
      },
      include: {
        cart: true,
        imagePersonalizations: { include: { images: true } },
      },
    })

    if (oldCartItems.length === 0) {
      console.log(
        `[${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}] No cart items older than ${formattedDate} to clean up`
      )
      return
    }

    // Track which user carts need updating
    const userIdsToUpdate = new Set<string>()

    // Group cart items by cart ID
    const itemsByCartId: Record<string, typeof oldCartItems> = {}

    for (const item of oldCartItems) {
      if (!itemsByCartId[item.cartId]) {
        itemsByCartId[item.cartId] = []
      }
      itemsByCartId[item.cartId].push(item)

      // Track user ID for later cart recalculation
      if (item.cart.userId) {
        userIdsToUpdate.add(item.cart.userId)
      }
    }

    // Delete old cart items
    await prisma.cartItem.deleteMany({
      where: {
        id: {
          in: oldCartItems.map((item) => item.id),
        },
      },
    })

    // Delete associated media files if needed
    // This would require implementing S3 deletion logic here
    const imageKeys = oldCartItems
      .flatMap((item) => item.imagePersonalizations)
      .flatMap((personalization) => personalization?.images || [])
      .map((image) => image.key)

    if (imageKeys.length > 0) {
      console.log(
        `[${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}] Would need to delete ${imageKeys.length} image files`
      )

      await deleteMediasFromS3(imageKeys)
    }

    // Update cart totals for affected users
    console.log(
      `[${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}] Updating cart data for ${userIdsToUpdate.size} users`
    )

    for (const userId of userIdsToUpdate) {
      await updateCartOverviewData({ userId })
    }

    console.log(
      `[${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}] Successfully cleaned up ${oldCartItems.length} cart items.`
    )
  } catch (error) {
    console.error(
      `[${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}] Error cleaning up cart items:`,
      error
    )
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Self-executing function to handle async/await in the main body
;(async () => {
  try {
    await cleanupCartItems()
    process.exit(0)
  } catch (error) {
    process.exit(1)
  }
})()
