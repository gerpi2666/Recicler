/*
  Warnings:

  - You are about to drop the column `ValiteDateFinish` on the `cupon` table. All the data in the column will be lost.
  - Added the required column `ValidateDateFinish` to the `Cupon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cupon` DROP COLUMN `ValiteDateFinish`,
    ADD COLUMN `ValidateDateFinish` DATETIME(3) NOT NULL;
