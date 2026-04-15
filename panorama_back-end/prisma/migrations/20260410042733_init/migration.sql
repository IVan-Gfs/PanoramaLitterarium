-- CreateTable
CREATE TABLE `Pessoa` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(191) NULL,
    `documento` VARCHAR(191) NULL,
    `tipoPessoa` ENUM('PF', 'PJ') NULL,
    `tel` VARCHAR(191) NULL,
    `usuarioId` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Pessoa_documento_key`(`documento`),
    UNIQUE INDEX `Pessoa_usuarioId_key`(`usuarioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Participante` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `pseudonimo` VARCHAR(191) NULL,
    `pessoaId` BIGINT NOT NULL,

    UNIQUE INDEX `Participante_pessoaId_key`(`pessoaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jurado` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `profissao` VARCHAR(191) NULL,
    `formacao` VARCHAR(191) NULL,
    `biografia` VARCHAR(191) NULL,
    `pessoaId` BIGINT NOT NULL,

    UNIQUE INDEX `Jurado_pessoaId_key`(`pessoaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Organizacao` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nomeFantasia` VARCHAR(191) NULL,
    `razaoSocial` VARCHAR(191) NULL,
    `tipo` VARCHAR(191) NULL,
    `cep` BIGINT NULL,
    `endereco` VARCHAR(191) NULL,
    `municipio` VARCHAR(191) NULL,
    `uf` CHAR(2) NULL,
    `pessoaId` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Organizacao_pessoaId_key`(`pessoaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GrupoCriterio` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NULL,
    `organizacaoId` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Criterio` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NULL,
    `descricao` VARCHAR(191) NULL,
    `pontuacaoMax` DOUBLE NULL,
    `grupoCriterioId` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

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
    `organizacaoId` BIGINT NOT NULL,
    `grupoCriterioId` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Banca` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `juradoId` BIGINT NOT NULL,
    `concursoId` BIGINT NOT NULL,

    UNIQUE INDEX `Banca_juradoId_concursoId_key`(`juradoId`, `concursoId`),
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

    UNIQUE INDEX `Inscricao_concursoId_participanteId_key`(`concursoId`, `participanteId`),
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

    UNIQUE INDEX `Submissao_obraId_inscricaoId_key`(`obraId`, `inscricaoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

    UNIQUE INDEX `AnaliseAvaliacao_submissaoId_bancaId_fase_key`(`submissaoId`, `bancaId`, `fase`),
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

    UNIQUE INDEX `Nota_analiseId_criterioId_key`(`analiseId`, `criterioId`),
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

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pessoa` ADD CONSTRAINT `Pessoa_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Participante` ADD CONSTRAINT `Participante_pessoaId_fkey` FOREIGN KEY (`pessoaId`) REFERENCES `Pessoa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Jurado` ADD CONSTRAINT `Jurado_pessoaId_fkey` FOREIGN KEY (`pessoaId`) REFERENCES `Pessoa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Organizacao` ADD CONSTRAINT `Organizacao_pessoaId_fkey` FOREIGN KEY (`pessoaId`) REFERENCES `Pessoa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GrupoCriterio` ADD CONSTRAINT `GrupoCriterio_organizacaoId_fkey` FOREIGN KEY (`organizacaoId`) REFERENCES `Organizacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Criterio` ADD CONSTRAINT `Criterio_grupoCriterioId_fkey` FOREIGN KEY (`grupoCriterioId`) REFERENCES `GrupoCriterio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Concurso` ADD CONSTRAINT `Concurso_organizacaoId_fkey` FOREIGN KEY (`organizacaoId`) REFERENCES `Organizacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Concurso` ADD CONSTRAINT `Concurso_grupoCriterioId_fkey` FOREIGN KEY (`grupoCriterioId`) REFERENCES `GrupoCriterio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Banca` ADD CONSTRAINT `Banca_juradoId_fkey` FOREIGN KEY (`juradoId`) REFERENCES `Jurado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Banca` ADD CONSTRAINT `Banca_concursoId_fkey` FOREIGN KEY (`concursoId`) REFERENCES `Concurso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Obra` ADD CONSTRAINT `Obra_participanteId_fkey` FOREIGN KEY (`participanteId`) REFERENCES `Participante`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inscricao` ADD CONSTRAINT `Inscricao_concursoId_fkey` FOREIGN KEY (`concursoId`) REFERENCES `Concurso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inscricao` ADD CONSTRAINT `Inscricao_participanteId_fkey` FOREIGN KEY (`participanteId`) REFERENCES `Participante`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Submissao` ADD CONSTRAINT `Submissao_obraId_fkey` FOREIGN KEY (`obraId`) REFERENCES `Obra`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Submissao` ADD CONSTRAINT `Submissao_inscricaoId_fkey` FOREIGN KEY (`inscricaoId`) REFERENCES `Inscricao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnaliseAvaliacao` ADD CONSTRAINT `AnaliseAvaliacao_submissaoId_fkey` FOREIGN KEY (`submissaoId`) REFERENCES `Submissao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AnaliseAvaliacao` ADD CONSTRAINT `AnaliseAvaliacao_bancaId_fkey` FOREIGN KEY (`bancaId`) REFERENCES `Banca`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nota` ADD CONSTRAINT `Nota_analiseId_fkey` FOREIGN KEY (`analiseId`) REFERENCES `AnaliseAvaliacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nota` ADD CONSTRAINT `Nota_criterioId_fkey` FOREIGN KEY (`criterioId`) REFERENCES `Criterio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Anotacao` ADD CONSTRAINT `Anotacao_analiseId_fkey` FOREIGN KEY (`analiseId`) REFERENCES `AnaliseAvaliacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
