-- AddForeignKey
ALTER TABLE `CategoriaConcurso` ADD CONSTRAINT `CategoriaConcurso_concursoId_fkey` FOREIGN KEY (`concursoId`) REFERENCES `Concurso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
