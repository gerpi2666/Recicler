/*
  Warnings:

  - You are about to drop the `_roletouser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[IdRol]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Total` to the `Orden` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Subtotal` to the `OrdenDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IdRol` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_roletouser` DROP FOREIGN KEY `_RoleToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_roletouser` DROP FOREIGN KEY `_RoleToUser_B_fkey`;

-- AlterTable
ALTER TABLE `orden` ADD COLUMN `Total` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `ordendetail` ADD COLUMN `Subtotal` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `IdRol` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_roletouser`;

-- CreateIndex
CREATE UNIQUE INDEX `User_IdRol_key` ON `User`(`IdRol`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_IdRol_fkey` FOREIGN KEY (`IdRol`) REFERENCES `Role`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cupon` ADD CONSTRAINT `Cupon_IdUser_fkey` FOREIGN KEY (`IdUser`) REFERENCES `User`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orden` ADD CONSTRAINT `Orden_IdUser_fkey` FOREIGN KEY (`IdUser`) REFERENCES `User`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orden` ADD CONSTRAINT `Orden_IdCenter_fkey` FOREIGN KEY (`IdCenter`) REFERENCES `RecicleCenter`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
