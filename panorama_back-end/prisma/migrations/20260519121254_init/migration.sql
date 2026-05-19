-- CreateTable
CREATE TABLE `AnaliseAvaliacao` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `anotacaoGeral` VARCHAR(191) NULL,
    `fase` INTEGER NOT NULL,
    `status` ENUM('PENDENTE', 'FINALIZADA') NOT NULL DEFAULT 'PENDENTE',
    `submissaoId` BIGINT NOT NULL,
    `bancaId` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `AnaliseAvaliacao_bancaId_fkey`(`bancaId`),
    UNIQUE INDEX `AnaliseAvaliacao_submissaoId_bancaId_fase_key`(`submissaoId`, `bancaId`, `fase`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Anotacao` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `texto` VARCHAR(191) NOT NULL,
    `inicio` INTEGER NOT NULL,
    `fim` INTEGER NOT NULL,
    `analiseId` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Anotacao_analiseId_fkey`(`analiseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Banca` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `juradoId` BIGINT NOT NULL,
    `concursoId` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Banca_concursoId_fkey`(`concursoId`),
    UNIQUE INDEX `Banca_juradoId_concursoId_key`(`juradoId`, `concursoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Concurso` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NULL,
    `imgCapa` VARCHAR(191) NULL,
    `generoLiterario` VARCHAR(191) NULL DEFAULT 'DIVERSOS',
    `qtdVencedores` INTEGER NULL,
    `taxaInscricao` DECIMAL(65, 30) NULL,
    `tema` VARCHAR(191) NULL DEFAULT 'LIVRE',
    `municipio` VARCHAR(191) NULL,
    `uf` CHAR(2) NULL,
    `premiacao` VARCHAR(191) NULL,
    `prazoInscricao` DATETIME(3) NULL,
    `limiteObras` INTEGER NULL DEFAULT 1,
    `restricao` VARCHAR(191) NULL DEFAULT 'NENHUMA',
    `etapaAtual` INTEGER NULL DEFAULT 1,
    `linkEdital` VARCHAR(191) NULL,
    `pdfEdital` VARCHAR(191) NULL,
    `dataFinalizacao` DATETIME(3) NULL,
    `gratuito` BOOLEAN NOT NULL DEFAULT true,
    `premioEmDinheiro` BOOLEAN NOT NULL DEFAULT false,
    `valorTotalPremios` DECIMAL(10, 2) NULL,
    `organizacaoId` BIGINT NOT NULL,
    `grupoCriterioId` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `descricao` VARCHAR(191) NULL,

    INDEX `Concurso_grupoCriterioId_fkey`(`grupoCriterioId`),
    INDEX `Concurso_organizacaoId_fkey`(`organizacaoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Categoria_nome_key`(`nome`),
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

-- CreateTable
CREATE TABLE `Criterio` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `pontuacaoMax` DOUBLE NULL,
    `grupoCriterioId` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Criterio_grupoCriterioId_fkey`(`grupoCriterioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GrupoCriterio` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NULL,
    `organizacaoId` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `GrupoCriterio_organizacaoId_fkey`(`organizacaoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inscricao` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `concursoId` BIGINT NOT NULL,
    `participanteId` BIGINT NOT NULL,
    `status` ENUM('PENDENTE', 'CONFIRMADA', 'CANCELADA') NOT NULL DEFAULT 'CONFIRMADA',
    `statusPagamento` ENUM('PENDENTE', 'PAGO', 'ISENTO') NOT NULL DEFAULT 'ISENTO',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Inscricao_participanteId_fkey`(`participanteId`),
    UNIQUE INDEX `Inscricao_concursoId_participanteId_key`(`concursoId`, `participanteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jurado` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `profissao` VARCHAR(191) NULL,
    `formacao` VARCHAR(191) NULL,
    `biografia` VARCHAR(191) NULL,
    `perfilId` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Jurado_perfilId_key`(`perfilId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nota` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `justificativa` VARCHAR(191) NULL,
    `valor` DECIMAL(5, 2) NOT NULL,
    `analiseId` BIGINT NOT NULL,
    `criterioId` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Nota_criterioId_fkey`(`criterioId`),
    UNIQUE INDEX `Nota_analiseId_criterioId_key`(`analiseId`, `criterioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Obra` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NULL,
    `tema` VARCHAR(191) NULL,
    `texto` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `participanteId` BIGINT NULL,

    INDEX `Obra_participanteId_fkey`(`participanteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Organizacao` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nomeFantasia` VARCHAR(191) NULL,
    `razaoSocial` VARCHAR(191) NULL,
    `cnpj` VARCHAR(191) NULL,
    `tipo` VARCHAR(191) NULL,
    `tipoPessoa` ENUM('PF', 'PJ') NULL,
    `cep` BIGINT NULL,
    `endereco` VARCHAR(191) NULL,
    `municipio` VARCHAR(191) NULL,
    `uf` CHAR(2) NULL,
    `perfilId` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Perfil_cpf_key`(`cnpj`),
    UNIQUE INDEX `Organizacao_perfilId_key`(`perfilId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Participante` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `pseudonimo` VARCHAR(191) NULL,
    `perfilId` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Participante_perfilId_key`(`perfilId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
CREATE TABLE `Submissao` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `obraId` BIGINT NOT NULL,
    `inscricaoId` BIGINT NOT NULL,
    `status` ENUM('PENDENTE', 'APROVADA', 'DESCLASSIFICADA') NOT NULL DEFAULT 'PENDENTE',
    `notaFinal` DECIMAL(5, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Submissao_inscricaoId_fkey`(`inscricaoId`),
    UNIQUE INDEX `Submissao_obraId_inscricaoId_key`(`obraId`, `inscricaoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `statusValidacao` BOOLEAN NOT NULL DEFAULT false,
    `recovery_token` VARCHAR(191) NULL,
    `token_expires` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsuarioRole` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `usuarioId` BIGINT NOT NULL,
    `roleId` BIGINT NOT NULL,

    UNIQUE INDEX `UsuarioRole_usuarioId_roleId_key`(`usuarioId`, `roleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `role` ENUM('ADMIN', 'JURADO', 'PARTICIPANTE', 'ORGANIZACAO') NOT NULL,

    UNIQUE INDEX `Role_role_key`(`role`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AnaliseAvaliacao` ADD CONSTRAINT `AnaliseAvaliacao_bancaId_fkey` FOREIGN KEY (`bancaId`) REFERENCES `Banca`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnaliseAvaliacao` ADD CONSTRAINT `AnaliseAvaliacao_submissaoId_fkey` FOREIGN KEY (`submissaoId`) REFERENCES `Submissao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Anotacao` ADD CONSTRAINT `Anotacao_analiseId_fkey` FOREIGN KEY (`analiseId`) REFERENCES `AnaliseAvaliacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Banca` ADD CONSTRAINT `Banca_concursoId_fkey` FOREIGN KEY (`concursoId`) REFERENCES `Concurso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Banca` ADD CONSTRAINT `Banca_juradoId_fkey` FOREIGN KEY (`juradoId`) REFERENCES `Jurado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Concurso` ADD CONSTRAINT `Concurso_grupoCriterioId_fkey` FOREIGN KEY (`grupoCriterioId`) REFERENCES `GrupoCriterio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Concurso` ADD CONSTRAINT `Concurso_organizacaoId_fkey` FOREIGN KEY (`organizacaoId`) REFERENCES `Organizacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoriaConcurso` ADD CONSTRAINT `CategoriaConcurso_concursoId_fkey` FOREIGN KEY (`concursoId`) REFERENCES `Concurso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoriaConcurso` ADD CONSTRAINT `CategoriaConcurso_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Criterio` ADD CONSTRAINT `Criterio_grupoCriterioId_fkey` FOREIGN KEY (`grupoCriterioId`) REFERENCES `GrupoCriterio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GrupoCriterio` ADD CONSTRAINT `GrupoCriterio_organizacaoId_fkey` FOREIGN KEY (`organizacaoId`) REFERENCES `Organizacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inscricao` ADD CONSTRAINT `Inscricao_concursoId_fkey` FOREIGN KEY (`concursoId`) REFERENCES `Concurso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inscricao` ADD CONSTRAINT `Inscricao_participanteId_fkey` FOREIGN KEY (`participanteId`) REFERENCES `Participante`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jurado` ADD CONSTRAINT `Jurado_perfilId_fkey` FOREIGN KEY (`perfilId`) REFERENCES `Perfil`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nota` ADD CONSTRAINT `Nota_analiseId_fkey` FOREIGN KEY (`analiseId`) REFERENCES `AnaliseAvaliacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nota` ADD CONSTRAINT `Nota_criterioId_fkey` FOREIGN KEY (`criterioId`) REFERENCES `Criterio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Obra` ADD CONSTRAINT `Obra_participanteId_fkey` FOREIGN KEY (`participanteId`) REFERENCES `Participante`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Organizacao` ADD CONSTRAINT `Organizacao_perfilId_fkey` FOREIGN KEY (`perfilId`) REFERENCES `Perfil`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Participante` ADD CONSTRAINT `Participante_perfilId_fkey` FOREIGN KEY (`perfilId`) REFERENCES `Perfil`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Perfil` ADD CONSTRAINT `Perfil_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Submissao` ADD CONSTRAINT `Submissao_inscricaoId_fkey` FOREIGN KEY (`inscricaoId`) REFERENCES `Inscricao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Submissao` ADD CONSTRAINT `Submissao_obraId_fkey` FOREIGN KEY (`obraId`) REFERENCES `Obra`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsuarioRole` ADD CONSTRAINT `UsuarioRole_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsuarioRole` ADD CONSTRAINT `UsuarioRole_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
