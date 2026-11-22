/*
  Warnings:

  - You are about to drop the column `recovery_token` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `token_expires` on the `usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[recoveryToken]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Usuario_recovery_token_key` ON `usuario`;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `recovery_token`,
    DROP COLUMN `token_expires`,
    ADD COLUMN `recoveryToken` VARCHAR(191) NULL,
    ADD COLUMN `tokenExpires` DATETIME(3) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_recovery_token_key` ON `Usuario`(`recoveryToken`);
