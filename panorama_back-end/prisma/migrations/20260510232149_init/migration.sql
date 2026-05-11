/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Categoria` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[role]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[usuarioId,roleId]` on the table `UsuarioRole` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `usuariorole` DROP FOREIGN KEY `UsuarioRole_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `usuariorole` DROP FOREIGN KEY `UsuarioRole_usuarioId_fkey`;

-- DropIndex
DROP INDEX `UsuarioRole_roleId_key` ON `usuariorole`;

-- DropIndex
DROP INDEX `UsuarioRole_usuarioId_key` ON `usuariorole`;

-- AlterTable
ALTER TABLE `role` MODIFY `role` ENUM('ADMIN', 'JURADO', 'PARTICIPANTE', 'ORGANIZACAO') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Categoria_nome_key` ON `Categoria`(`nome`);

-- CreateIndex
CREATE UNIQUE INDEX `Role_role_key` ON `Role`(`role`);

-- CreateIndex
CREATE UNIQUE INDEX `UsuarioRole_usuarioId_roleId_key` ON `UsuarioRole`(`usuarioId`, `roleId`);

-- AddForeignKey
ALTER TABLE `UsuarioRole` ADD CONSTRAINT `UsuarioRole_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsuarioRole` ADD CONSTRAINT `UsuarioRole_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
