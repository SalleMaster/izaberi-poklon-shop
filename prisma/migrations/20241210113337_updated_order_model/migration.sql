/*
  Warnings:

  - Added the required column `deliveryFee` to the `cart_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryFee` to the `carts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPriceWithDeliveryFee` to the `carts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderDeliveryFee` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderDiscount` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderOnlinePrice` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderTotalPrice` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cart_items" ADD COLUMN     "deliveryFee" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "carts" ADD COLUMN     "deliveryFee" INTEGER NOT NULL,
ADD COLUMN     "totalPriceWithDeliveryFee" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "delivery_services" ADD COLUMN     "predefinedPrices" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "deliveryServiceName" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "orderDeliveryFee" INTEGER NOT NULL,
ADD COLUMN     "orderDiscount" INTEGER NOT NULL,
ADD COLUMN     "orderOnlinePrice" INTEGER NOT NULL,
ADD COLUMN     "orderTotalPrice" INTEGER NOT NULL;
