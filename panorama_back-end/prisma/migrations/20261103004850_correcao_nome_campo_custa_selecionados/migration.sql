/*
  Warnings:

  - You are about to drop the column `CustoSelecionados` on the `concurso` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `concurso` DROP COLUMN `CustoSelecionados`,
    ADD COLUMN `custoSelecionados` DECIMAL(10, 2) NULL;
