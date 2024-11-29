/*
  Warnings:

  - Added the required column `discount` to the `carts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `onlinePrice` to the `carts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `carts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "carts" ADD COLUMN     "discount" INTEGER NOT NULL,
ADD COLUMN     "onlinePrice" INTEGER NOT NULL,
ADD COLUMN     "totalPrice" INTEGER NOT NULL;
