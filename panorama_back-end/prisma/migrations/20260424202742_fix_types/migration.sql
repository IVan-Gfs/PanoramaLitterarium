/*
  Warnings:

  - Added the required column `updatedAt` to the `banca` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `jurado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `participante` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `banca` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `jurado` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `participante` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
