import { OrderStatusType, PrismaClient } from '@prisma/client'

// Create a dedicated Prisma instance for this script
// Not using the shared instance since this runs independently
const prisma = new PrismaClient()

async function cleanupDraftOrders(): Promise<void> {
  // Calculate date 2 days ago
  const twoDaysAgo = new Date()
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)

  console.log(
    `[${new Date().toISOString()}] Starting cleanup of draft orders older than ${twoDaysAgo.toISOString()}`
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

    console.log(
      `[${new Date().toISOString()}] Successfully cleaned up ${result.count} draft orders`
    )
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] Error cleaning up draft orders:`,
      error
    )
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
