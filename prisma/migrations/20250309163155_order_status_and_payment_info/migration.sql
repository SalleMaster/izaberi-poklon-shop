-- CreateEnum
CREATE TYPE "OrderPaymentStatusType" AS ENUM ('pending', 'success', 'failed');

-- AlterEnum
ALTER TYPE "OrderStatusType" ADD VALUE 'draft';

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "checkoutId" TEXT,
ADD COLUMN     "paymentDetails" JSONB,
ADD COLUMN     "paymentId" TEXT,
ADD COLUMN     "paymentStatus" "OrderPaymentStatusType";
