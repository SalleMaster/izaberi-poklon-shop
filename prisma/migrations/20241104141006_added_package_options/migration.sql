-- AlterTable
ALTER TABLE "products" ADD COLUMN     "packageOptionId" TEXT;

-- CreateTable
CREATE TABLE "package_options" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "package_options_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "package_options_name_key" ON "package_options"("name");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_packageOptionId_fkey" FOREIGN KEY ("packageOptionId") REFERENCES "package_options"("id") ON DELETE SET NULL ON UPDATE CASCADE;
