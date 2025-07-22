CREATE DATABASE IF NOT EXISTS trailerflix;
USE trailerflix;

CREATE TABLE IF NOT EXISTS `Genero` (
  `id_genero` INT AUTO_INCREMENT NOT NULL,
  `nombre` VARCHAR(256) NOT NULL UNIQUE,
  PRIMARY KEY (`id_genero`)
);

CREATE TABLE IF NOT EXISTS `Catalogo` (
  `id_catalogo` INT AUTO_INCREMENT NOT NULL,
  `poster` VARCHAR(256),
  `titulo` VARCHAR(256) NOT NULL,
  `resumen` VARCHAR(1024),
  `temporadas` INT,
  `trailer` VARCHAR(256),
  `genero` INT NOT NULL,
  `categoria` ENUM('Serie', 'Pelicula') NOT NULL,
  PRIMARY KEY (`id_catalogo`),
  CONSTRAINT `fk_catalogo_genero` FOREIGN KEY (`genero`) REFERENCES `Genero`(`id_genero`)
);

CREATE TABLE IF NOT EXISTS `Actor` (
  `id_actor` INT AUTO_INCREMENT NOT NULL,
  `nombre` VARCHAR(256) NOT NULL,
  `apellido` VARCHAR(256) NOT NULL,
  PRIMARY KEY (`id_actor`)
);

CREATE TABLE IF NOT EXISTS `Tag` (
  `id_tag` INT AUTO_INCREMENT NOT NULL,
  `nombre` VARCHAR(256) NOT NULL UNIQUE,
  PRIMARY KEY (`id_tag`)
);

CREATE TABLE IF NOT EXISTS `Catalogo_Tag` (
  `id_catalogo` INT NOT NULL,
  `id_tag` INT NOT NULL,
  PRIMARY KEY (`id_catalogo`, `id_tag`),
  CONSTRAINT `fk_catalogo_tag_catalogo` FOREIGN KEY (`id_catalogo`) REFERENCES `Catalogo`(`id_catalogo`),
  CONSTRAINT `fk_catalogo_tag_tag` FOREIGN KEY (`id_tag`) REFERENCES `Tag`(`id_tag`)
);

CREATE TABLE IF NOT EXISTS `Catalogo_Actor` (
  `id_actor` INT NOT NULL,
  `id_catalogo` INT NOT NULL,
  PRIMARY KEY (`id_catalogo`, `id_actor`),
  CONSTRAINT `fk_catalogo_actor_actor` FOREIGN KEY (`id_actor`) REFERENCES `Actor`(`id_actor`),
  CONSTRAINT `fk_catalogo_actor_catalogo` FOREIGN KEY (`id_catalogo`) REFERENCES `Catalogo`(`id_catalogo`)
);
