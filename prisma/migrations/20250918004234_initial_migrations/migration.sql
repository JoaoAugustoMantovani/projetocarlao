-- CreateTable
CREATE TABLE `system_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `login` VARCHAR(150) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `name` VARCHAR(80) NULL,
    `cellphone` VARCHAR(15) NULL,
    `isActive` BOOLEAN NULL DEFAULT true,
    `isauthorized` BOOLEAN NULL DEFAULT false,
    `emailValidation` BOOLEAN NULL DEFAULT false,
    `role` ENUM('CLIENT', 'ADMIN', 'ROOT') NOT NULL DEFAULT 'CLIENT',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `apelido` VARCHAR(30) NULL,
    `ultimaAutorizacao` VARCHAR(100) NULL,
    `ultimoacesso` DATETIME(3) NULL,

    UNIQUE INDEX `system_users_login_key`(`login`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `system_user_authorization` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `iduser` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `action` BOOLEAN NULL,

    INDEX `system_user_authorizations_iduser_fkey`(`iduser`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `system_user_reset_passwords` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `iduser` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NULL,
    `ip` VARCHAR(191) NULL,
    `userAgent` VARCHAR(191) NULL,
    `isUsed` BOOLEAN NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `system_user_reset_passwords_iduser_fkey`(`iduser`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `system_config` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email_host` LONGTEXT NULL,
    `email_port` LONGTEXT NULL,
    `email_user` LONGTEXT NULL,
    `email_pass` LONGTEXT NULL,
    `email_secure` BOOLEAN NULL DEFAULT false,
    `email_tls` BOOLEAN NULL DEFAULT true,
    `email_from` VARCHAR(80) NULL,
    `keyapibackend` LONGTEXT NULL,
    `noticias_ultimasquantidade` INTEGER NULL DEFAULT 8,
    `padraolinhaspaginas` INTEGER NULL DEFAULT 10,
    `forcartrocasenhaemDias` INTEGER NULL DEFAULT 28,
    `linkncmantesreforma` LONGTEXT NULL,
    `ativo` BOOLEAN NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `system_email_templates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title_email` VARCHAR(100) NULL,
    `subject_email` VARCHAR(100) NULL,
    `body_html` LONGTEXT NULL,
    `ativo` BOOLEAN NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users_validation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(10) NOT NULL,
    `registerdate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `validationdate` DATETIME(3) NULL,
    `userid` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sensors_readings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sensor` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `registerdate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `system_user_authorization` ADD CONSTRAINT `system_user_authorization_iduser_fkey` FOREIGN KEY (`iduser`) REFERENCES `system_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
