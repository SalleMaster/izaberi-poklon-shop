import { updateCartOverviewData } from '@/app/(shop)/_actions/cart/actions'
import { deleteMediaFromS3 } from '@/lib/actions'
import { PrismaClient } from '@prisma/client'
import { subDays, format } from 'date-fns'

// Create a dedicated Prisma instance for this script
const prisma = new PrismaClient()

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

      await Promise.all(
        imageKeys.map(async (key) => {
          await deleteMediaFromS3(key)
        })
      )
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
