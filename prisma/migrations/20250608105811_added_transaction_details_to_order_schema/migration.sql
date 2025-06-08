-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "paymentAuthorizationCode" TEXT,
ADD COLUMN     "paymentStatusCode" TEXT,
ADD COLUMN     "paymentTimestamp" TEXT;
