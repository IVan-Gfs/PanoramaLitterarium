/*
  Warnings:

  - Made the column `nome` on table `criterio` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `criterio` MODIFY `nome` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CategoriaConcurso` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `concursoId` BIGINT NOT NULL,
    `categoriaId` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `CategoriaConcurso_concursoId_fkey`(`concursoId`),
    INDEX `CategoriaConcurso_categoriaId_fkey`(`categoriaId`),
    UNIQUE INDEX `CategoriaConcurso_concursoId_categoriaId_key`(`concursoId`, `categoriaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CategoriaConcurso` ADD CONSTRAINT `CategoriaConcurso_concursoId_fkey` FOREIGN KEY (`concursoId`) REFERENCES `Concurso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoriaConcurso` ADD CONSTRAINT `CategoriaConcurso_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
