/*
  Warnings:

  - A unique constraint covering the columns `[UserAdmin]` on the table `RecicleCenter` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `RecicleCenter_UserAdmin_key` ON `RecicleCenter`(`UserAdmin`);
