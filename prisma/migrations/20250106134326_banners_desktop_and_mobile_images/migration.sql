/*
  Warnings:

  - You are about to drop the column `bannerId` on the `medias` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[desktopBannerImageId]` on the table `medias` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mobileBannerImageId]` on the table `medias` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "medias" DROP CONSTRAINT "medias_bannerId_fkey";

-- DropIndex
DROP INDEX "medias_bannerId_key";

-- AlterTable
ALTER TABLE "medias" DROP COLUMN "bannerId",
ADD COLUMN     "desktopBannerImageId" TEXT,
ADD COLUMN     "mobileBannerImageId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "medias_desktopBannerImageId_key" ON "medias"("desktopBannerImageId");

-- CreateIndex
CREATE UNIQUE INDEX "medias_mobileBannerImageId_key" ON "medias"("mobileBannerImageId");

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "medias_desktopBannerImageId_fkey" FOREIGN KEY ("desktopBannerImageId") REFERENCES "banners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "medias_mobileBannerImageId_fkey" FOREIGN KEY ("mobileBannerImageId") REFERENCES "banners"("id") ON DELETE CASCADE ON UPDATE CASCADE;
