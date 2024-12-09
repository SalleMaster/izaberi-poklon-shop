/*
  Warnings:

  - Added the required column `type` to the `delivery_addresses` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DeliveryAddressType" AS ENUM ('delivery', 'billing');

-- AlterTable
ALTER TABLE "delivery_addresses" ADD COLUMN     "type" "DeliveryAddressType" NOT NULL;
