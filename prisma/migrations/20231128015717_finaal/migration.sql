-- CreateTable
CREATE TABLE `User` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Identification` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `IdRol` INTEGER NOT NULL,
    `IdWallet` INTEGER NULL,
    `Name` VARCHAR(191) NULL,
    `Number` VARCHAR(191) NOT NULL,
    `Direccion` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NULL,
    `Enabled` BOOLEAN NOT NULL,

    UNIQUE INDEX `User_Identification_key`(`Identification`),
    UNIQUE INDEX `User_Email_key`(`Email`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecicleCenter` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `Provincia` VARCHAR(191) NOT NULL,
    `Canton` VARCHAR(191) NOT NULL,
    `Distrito` VARCHAR(191) NOT NULL,
    `Numero` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Schecudale` VARCHAR(191) NOT NULL,
    `UserAdmin` INTEGER NOT NULL,
    `Enabled` BOOLEAN NOT NULL,

    UNIQUE INDEX `RecicleCenter_UserAdmin_key`(`UserAdmin`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Material` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NULL,
    `Description` VARCHAR(191) NULL,
    `Color` VARCHAR(191) NULL,
    `Unit` VARCHAR(191) NULL,
    `Price` DECIMAL(65, 30) NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Wallet` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `IdUser` INTEGER NOT NULL,
    `AvaibleCoins` DECIMAL(65, 30) NOT NULL,
    `ChangesCoins` DECIMAL(65, 30) NOT NULL,
    `RecivedCoins` DECIMAL(65, 30) NOT NULL,

    UNIQUE INDEX `Wallet_IdUser_key`(`IdUser`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cupon` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NULL,
    `IdUser` INTEGER NULL,
    `Description` VARCHAR(191) NOT NULL,
    `Image` VARCHAR(191) NULL,
    `ValiteDate` DATETIME(3) NOT NULL,
    `Price` DECIMAL(65, 30) NOT NULL,
    `Estado` BOOLEAN NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Orden` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `IdUser` INTEGER NOT NULL,
    `IdCenter` INTEGER NOT NULL,
    `Date` DATETIME(3) NOT NULL,
    `Total` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrdenDetail` (
    `OrdenId` INTEGER NOT NULL,
    `MaterialId` INTEGER NOT NULL,
    `Cantidad` INTEGER NOT NULL,
    `Subtotal` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`OrdenId`, `MaterialId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_MaterialToRecicleCenter` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_MaterialToRecicleCenter_AB_unique`(`A`, `B`),
    INDEX `_MaterialToRecicleCenter_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CategoryToCupon` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CategoryToCupon_AB_unique`(`A`, `B`),
    INDEX `_CategoryToCupon_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_IdWallet_fkey` FOREIGN KEY (`IdWallet`) REFERENCES `Wallet`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_IdRol_fkey` FOREIGN KEY (`IdRol`) REFERENCES `Role`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecicleCenter` ADD CONSTRAINT `RecicleCenter_UserAdmin_fkey` FOREIGN KEY (`UserAdmin`) REFERENCES `User`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cupon` ADD CONSTRAINT `Cupon_IdUser_fkey` FOREIGN KEY (`IdUser`) REFERENCES `User`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orden` ADD CONSTRAINT `Orden_IdUser_fkey` FOREIGN KEY (`IdUser`) REFERENCES `User`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orden` ADD CONSTRAINT `Orden_IdCenter_fkey` FOREIGN KEY (`IdCenter`) REFERENCES `RecicleCenter`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrdenDetail` ADD CONSTRAINT `OrdenDetail_MaterialId_fkey` FOREIGN KEY (`MaterialId`) REFERENCES `Material`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrdenDetail` ADD CONSTRAINT `OrdenDetail_OrdenId_fkey` FOREIGN KEY (`OrdenId`) REFERENCES `Orden`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MaterialToRecicleCenter` ADD CONSTRAINT `_MaterialToRecicleCenter_A_fkey` FOREIGN KEY (`A`) REFERENCES `Material`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MaterialToRecicleCenter` ADD CONSTRAINT `_MaterialToRecicleCenter_B_fkey` FOREIGN KEY (`B`) REFERENCES `RecicleCenter`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToCupon` ADD CONSTRAINT `_CategoryToCupon_A_fkey` FOREIGN KEY (`A`) REFERENCES `Category`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToCupon` ADD CONSTRAINT `_CategoryToCupon_B_fkey` FOREIGN KEY (`B`) REFERENCES `Cupon`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
