-- CreateEnum
CREATE TYPE "OrderDeliveryType" AS ENUM ('delivery', 'pickup');

-- CreateEnum
CREATE TYPE "OrderPaymentType" AS ENUM ('onDelivery', 'card', 'ips', 'bankTransfer');

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "deliveryType" "OrderDeliveryType" NOT NULL,
    "paymentType" "OrderPaymentType" NOT NULL,
    "cart" JSONB NOT NULL,
    "deliveryName" TEXT NOT NULL DEFAULT '',
    "deliveryAddress" TEXT NOT NULL DEFAULT '',
    "deliveryCity" TEXT NOT NULL DEFAULT '',
    "deliveryZip" TEXT NOT NULL DEFAULT '',
    "deliveryPhone" TEXT NOT NULL DEFAULT '',
    "deliveryEmail" TEXT NOT NULL DEFAULT '',
    "deliveryNote" TEXT NOT NULL DEFAULT '',
    "pickupName" TEXT NOT NULL DEFAULT '',
    "pickupPhone" TEXT NOT NULL DEFAULT '',
    "pickupEmail" TEXT NOT NULL DEFAULT '',
    "billingName" TEXT NOT NULL DEFAULT '',
    "billingAddress" TEXT NOT NULL DEFAULT '',
    "billingCity" TEXT NOT NULL DEFAULT '',
    "billingZip" TEXT NOT NULL DEFAULT '',
    "billingPhone" TEXT NOT NULL DEFAULT '',
    "billingEmail" TEXT NOT NULL DEFAULT '',
    "billingNote" TEXT NOT NULL DEFAULT '',
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
