-- DropForeignKey
ALTER TABLE `concurso` DROP FOREIGN KEY `Concurso_grupoCriterioId_fkey`;

-- AlterTable
ALTER TABLE `concurso` MODIFY `grupoCriterioId` BIGINT NULL;

-- AddForeignKey
ALTER TABLE `Concurso` ADD CONSTRAINT `Concurso_grupoCriterioId_fkey` FOREIGN KEY (`grupoCriterioId`) REFERENCES `GrupoCriterio`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
