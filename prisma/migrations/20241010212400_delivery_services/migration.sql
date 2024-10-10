/*
  Warnings:

  - A unique constraint covering the columns `[deliveryServiceId]` on the table `medias` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "medias" ADD COLUMN     "deliveryServiceId" TEXT;

-- CreateTable
CREATE TABLE "delivery_services" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "active" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "delivery_services_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "delivery_services_name_key" ON "delivery_services"("name");

-- CreateIndex
CREATE UNIQUE INDEX "medias_deliveryServiceId_key" ON "medias"("deliveryServiceId");

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "medias_deliveryServiceId_fkey" FOREIGN KEY ("deliveryServiceId") REFERENCES "delivery_services"("id") ON DELETE CASCADE ON UPDATE CASCADE;
