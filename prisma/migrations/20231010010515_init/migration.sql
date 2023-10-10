/*
  Warnings:

  - A unique constraint covering the columns `[Identification]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Enabled` to the `RecicleCenter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Identification` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reciclecenter` ADD COLUMN `Enabled` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `Identification` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_Identification_key` ON `User`(`Identification`);
