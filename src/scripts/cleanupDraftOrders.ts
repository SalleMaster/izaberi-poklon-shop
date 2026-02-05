import { OrderStatusType, PrismaClient } from '../../generated/prisma'
import { subDays, format } from 'date-fns'

// Create a dedicated Prisma instance for this script
// Not using the shared instance since this runs independently
const prisma = new PrismaClient()

async function cleanupDraftOrders(): Promise<void> {
  // Calculate date 2 days ago
  const twoDaysAgo = subDays(new Date(), 2)
  const formattedDate = format(twoDaysAgo, 'yyyy-MM-dd HH:mm:ss')
  const currentDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss')

  console.log(
    `[${currentDate}] Starting cleanup of draft orders older than ${formattedDate}`,
  )

  try {
    // Delete draft orders older than two days
    const result = await prisma.order.deleteMany({
      where: {
        status: OrderStatusType.draft,
        createdAt: {
          lt: twoDaysAgo,
        },
      },
    })

    if (result.count === 0) {
      console.log(
        `[${currentDate}] No draft orders older than ${formattedDate} to clean up`,
      )
      return
    }

    console.log(
      `[${currentDate}] Successfully cleaned up ${result.count} draft orders`,
    )
  } catch (error) {
    console.error(`[${currentDate}] Error cleaning up draft orders:`, error)
    // Re-throw to ensure non-zero exit code
    throw error
  } finally {
    // Ensure Prisma connection is closed
    await prisma.$disconnect()
  }
}

// Self-executing function to handle async/await in the main body
;(async () => {
  try {
    await cleanupDraftOrders()
    // Exit with success code
    process.exit(0)
  } catch (error) {
    // Exit with error code
    process.exit(1)
  }
})()
