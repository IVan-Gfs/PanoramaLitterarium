-- AlterTable
ALTER TABLE `concurso` ADD COLUMN `gratuito` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `premioEmDinheiro` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `valorTotalPremios` DECIMAL(10, 2) NULL;
