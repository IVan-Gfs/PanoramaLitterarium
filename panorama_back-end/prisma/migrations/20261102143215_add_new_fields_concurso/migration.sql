-- AlterTable
ALTER TABLE `concurso` ADD COLUMN `CustoSelecionados` DECIMAL(10, 2) NULL,
    ADD COLUMN `limitesTexto` VARCHAR(191) NULL DEFAULT 'Sem limites',
    ADD COLUMN `linkInscricao` VARCHAR(191) NULL,
    MODIFY `tema` VARCHAR(191) NULL DEFAULT 'Livre',
    MODIFY `restricao` VARCHAR(191) NULL DEFAULT 'Nenhuma restrição';
