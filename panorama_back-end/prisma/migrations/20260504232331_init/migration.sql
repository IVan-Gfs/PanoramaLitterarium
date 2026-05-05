/*
  Warnings:

  - You are about to drop the column `pessoaId` on the `jurado` table. All the data in the column will be lost.
  - You are about to drop the column `pessoaId` on the `organizacao` table. All the data in the column will be lost.
  - You are about to drop the column `pessoaId` on the `participante` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the `pessoa` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[perfilId]` on the table `Jurado` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cnpj]` on the table `Organizacao` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[perfilId]` on the table `Organizacao` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[perfilId]` on the table `Participante` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `perfilId` to the `Jurado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `perfilId` to the `Organizacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `perfilId` to the `Participante` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `jurado` DROP FOREIGN KEY `Jurado_pessoaId_fkey`;

-- DropForeignKey
ALTER TABLE `organizacao` DROP FOREIGN KEY `Organizacao_pessoaId_fkey`;

-- DropForeignKey
ALTER TABLE `participante` DROP FOREIGN KEY `Participante_pessoaId_fkey`;

-- DropForeignKey
ALTER TABLE `pessoa` DROP FOREIGN KEY `Pessoa_usuarioId_fkey`;

-- DropIndex
DROP INDEX `Jurado_pessoaId_key` ON `jurado`;

-- DropIndex
DROP INDEX `Organizacao_pessoaId_key` ON `organizacao`;

-- DropIndex
DROP INDEX `Participante_pessoaId_key` ON `participante`;

-- AlterTable
ALTER TABLE `jurado` DROP COLUMN `pessoaId`,
    ADD COLUMN `perfilId` BIGINT NOT NULL;

-- AlterTable
ALTER TABLE `organizacao` DROP COLUMN `pessoaId`,
    ADD COLUMN `cnpj` VARCHAR(191) NULL,
    ADD COLUMN `perfilId` BIGINT NOT NULL,
    ADD COLUMN `tipoPessoa` ENUM('PF', 'PJ') NULL;

-- AlterTable
ALTER TABLE `participante` DROP COLUMN `pessoaId`,
    ADD COLUMN `perfilId` BIGINT NOT NULL;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `tipo`;

-- DropTable
DROP TABLE `pessoa`;

-- CreateTable
CREATE TABLE `Perfil` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(191) NULL,
    `cpf` VARCHAR(191) NULL,
    `tel` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `usuarioId` BIGINT NOT NULL,

    UNIQUE INDEX `Perfil_cpf_key`(`cpf`),
    UNIQUE INDEX `perfil_usuarioId_key`(`usuarioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsuarioRole` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `usuarioId` BIGINT NOT NULL,
    `roleId` BIGINT NOT NULL,

    UNIQUE INDEX `UsuarioRole_usuarioId_key`(`usuarioId`),
    UNIQUE INDEX `UsuarioRole_roleId_key`(`roleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `role` ENUM('ADMIN', 'JURADO', 'PARTICIPANTE') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Jurado_perfilId_key` ON `Jurado`(`perfilId`);

-- CreateIndex
CREATE UNIQUE INDEX `Perfil_cpf_key` ON `Organizacao`(`cnpj`);

-- CreateIndex
CREATE UNIQUE INDEX `Organizacao_perfilId_key` ON `Organizacao`(`perfilId`);

-- CreateIndex
CREATE UNIQUE INDEX `Participante_perfilId_key` ON `Participante`(`perfilId`);

-- AddForeignKey
ALTER TABLE `Jurado` ADD CONSTRAINT `Jurado_perfilId_fkey` FOREIGN KEY (`perfilId`) REFERENCES `Perfil`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Organizacao` ADD CONSTRAINT `Organizacao_perfilId_fkey` FOREIGN KEY (`perfilId`) REFERENCES `Perfil`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Participante` ADD CONSTRAINT `Participante_perfilId_fkey` FOREIGN KEY (`perfilId`) REFERENCES `Perfil`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Perfil` ADD CONSTRAINT `Perfil_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsuarioRole` ADD CONSTRAINT `UsuarioRole_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsuarioRole` ADD CONSTRAINT `UsuarioRole_roleId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
