/*
  Warnings:

  - Added the required column `fontType` to the `cart_items` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FontType" AS ENUM ('latin', 'cyrillic');

-- AlterTable
ALTER TABLE "cart_items" ADD COLUMN     "fontType" "FontType" NOT NULL;

-- AlterTable
ALTER TABLE "medias" ADD COLUMN     "imagePersonalizationId" TEXT;

-- CreateTable
CREATE TABLE "text_personalizations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "cartItemId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "text_personalizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image_personalizations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cartItemId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "image_personalizations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "medias_imagePersonalizationId_fkey" FOREIGN KEY ("imagePersonalizationId") REFERENCES "image_personalizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "text_personalizations" ADD CONSTRAINT "text_personalizations_cartItemId_fkey" FOREIGN KEY ("cartItemId") REFERENCES "cart_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image_personalizations" ADD CONSTRAINT "image_personalizations_cartItemId_fkey" FOREIGN KEY ("cartItemId") REFERENCES "cart_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
