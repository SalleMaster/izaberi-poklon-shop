/*
  Warnings:

  - You are about to drop the column `price` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "price";

-- CreateTable
CREATE TABLE "delivery_fees" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fee" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "delivery_fees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "price_ranges" (
    "id" TEXT NOT NULL,
    "from" INTEGER NOT NULL,
    "to" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "deliveryFeeId" TEXT NOT NULL,
    "productId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "price_ranges_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "price_ranges" ADD CONSTRAINT "price_ranges_deliveryFeeId_fkey" FOREIGN KEY ("deliveryFeeId") REFERENCES "delivery_fees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "price_ranges" ADD CONSTRAINT "price_ranges_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
