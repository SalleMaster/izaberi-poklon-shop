/*
  Warnings:

  - You are about to drop the `MediaDeprecated` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MediaDeprecated" DROP CONSTRAINT "MediaDeprecated_postId_fkey";

-- DropForeignKey
ALTER TABLE "MediaDeprecated" DROP CONSTRAINT "MediaDeprecated_userId_fkey";

-- AlterTable
ALTER TABLE "medias" ADD COLUMN     "productImagesId" TEXT;

-- DropTable
DROP TABLE "MediaDeprecated";

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "discounts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "percentage" INTEGER NOT NULL,
    "active" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "discounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "discountId" TEXT,
    "material" TEXT NOT NULL,
    "dimensions" TEXT NOT NULL,
    "personalization" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "coverImageId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "discounts_name_key" ON "discounts"("name");

-- CreateIndex
CREATE UNIQUE INDEX "products_name_key" ON "products"("name");

-- CreateIndex
CREATE UNIQUE INDEX "products_code_key" ON "products"("code");

-- CreateIndex
CREATE UNIQUE INDEX "products_coverImageId_key" ON "products"("coverImageId");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToProduct_AB_unique" ON "_CategoryToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToProduct_B_index" ON "_CategoryToProduct"("B");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_discountId_fkey" FOREIGN KEY ("discountId") REFERENCES "discounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_coverImageId_fkey" FOREIGN KEY ("coverImageId") REFERENCES "medias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "medias_productImagesId_fkey" FOREIGN KEY ("productImagesId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProduct" ADD CONSTRAINT "_CategoryToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProduct" ADD CONSTRAINT "_CategoryToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
