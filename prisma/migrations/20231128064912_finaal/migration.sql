/*
  Warnings:

  - You are about to drop the column `Image` on the `cupon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cupon` DROP COLUMN `Image`,
    ADD COLUMN `Qr` VARCHAR(191) NULL;
