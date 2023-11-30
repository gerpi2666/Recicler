/*
  Warnings:

  - You are about to drop the column `ValiteDate` on the `cupon` table. All the data in the column will be lost.
  - Added the required column `ValidateDateBegin` to the `Cupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ValiteDateFinish` to the `Cupon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cupon` DROP COLUMN `ValiteDate`,
    ADD COLUMN `ValidateDateBegin` DATETIME(3) NOT NULL,
    ADD COLUMN `ValiteDateFinish` DATETIME(3) NOT NULL;
