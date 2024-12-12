/*
  Warnings:

  - A unique constraint covering the columns `[orderNumber]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderNumber` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatusType" AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'canceled');

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "orderNumber" INTEGER NOT NULL,
ADD COLUMN     "status" "OrderStatusType" NOT NULL DEFAULT 'pending';

-- CreateIndex
CREATE UNIQUE INDEX "orders_orderNumber_key" ON "orders"("orderNumber");
