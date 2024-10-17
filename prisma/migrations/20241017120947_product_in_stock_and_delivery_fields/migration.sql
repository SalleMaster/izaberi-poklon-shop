/*
  Warnings:

  - You are about to drop the column `coverImageId` on the `products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productCoverId]` on the table `medias` will be added. If there are existing duplicate values, this will fail.
  - Made the column `active` on table `categories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `active` on table `delivery_services` required. This step will fail if there are existing NULL values in that column.
  - Made the column `active` on table `discounts` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `delivery` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_coverImageId_fkey";

-- DropIndex
DROP INDEX "products_coverImageId_key";

-- DropIndex
DROP INDEX "products_name_key";

-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "active" SET NOT NULL;

-- AlterTable
ALTER TABLE "delivery_services" ALTER COLUMN "active" SET NOT NULL;

-- AlterTable
ALTER TABLE "discounts" ALTER COLUMN "active" SET NOT NULL;

-- AlterTable
ALTER TABLE "medias" ADD COLUMN     "productCoverId" TEXT;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "coverImageId",
ADD COLUMN     "delivery" TEXT NOT NULL,
ADD COLUMN     "inStock" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "text_personalization_fields" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "placeholder" TEXT NOT NULL,
    "productId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "text_personalization_fields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image_personalization_fields" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "min" INTEGER NOT NULL,
    "productId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "image_personalization_fields_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "medias_productCoverId_key" ON "medias"("productCoverId");

-- AddForeignKey
ALTER TABLE "text_personalization_fields" ADD CONSTRAINT "text_personalization_fields_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image_personalization_fields" ADD CONSTRAINT "image_personalization_fields_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "medias_productCoverId_fkey" FOREIGN KEY ("productCoverId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
