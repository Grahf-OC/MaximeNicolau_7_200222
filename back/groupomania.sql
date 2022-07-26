-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mar. 26 juil. 2022 à 20:05
-- Version du serveur :  8.0.29-0ubuntu0.20.04.3
-- Version de PHP : 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `Likes`
--

CREATE TABLE `Likes` (
  `id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `MessageId` int DEFAULT NULL,
  `UserId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Likes`
--

INSERT INTO `Likes` (`id`, `createdAt`, `updatedAt`, `MessageId`, `UserId`) VALUES
(57, '2022-07-23 12:43:22', '2022-07-23 12:43:22', 4, 5),
(66, '2022-07-24 14:17:01', '2022-07-24 14:17:01', 52, 24),
(68, '2022-07-24 17:44:53', '2022-07-24 17:44:53', 52, 22),
(71, '2022-07-25 15:28:34', '2022-07-25 15:28:34', 4, 22),
(74, '2022-07-25 20:21:40', '2022-07-25 20:21:40', 57, 27),
(77, '2022-07-25 20:53:29', '2022-07-25 20:53:29', 57, 28),
(79, '2022-07-25 20:53:31', '2022-07-25 20:53:31', 52, 28),
(80, '2022-07-25 20:53:33', '2022-07-25 20:53:33', 4, 28),
(85, '2022-07-25 21:08:46', '2022-07-25 21:08:46', 60, 5),
(86, '2022-07-26 10:25:50', '2022-07-26 10:25:50', 63, 30),
(87, '2022-07-26 10:25:51', '2022-07-26 10:25:51', 62, 30),
(89, '2022-07-26 10:25:55', '2022-07-26 10:25:55', 52, 30),
(90, '2022-07-26 10:25:57', '2022-07-26 10:25:57', 4, 30),
(92, '2022-07-26 15:46:28', '2022-07-26 15:46:28', 60, 32),
(93, '2022-07-26 15:46:29', '2022-07-26 15:46:29', 62, 32),
(94, '2022-07-26 15:46:31', '2022-07-26 15:46:31', 64, 32),
(95, '2022-07-26 15:48:33', '2022-07-26 15:48:33', 64, 5),
(96, '2022-07-26 15:53:50', '2022-07-26 15:53:50', 52, 5);

-- --------------------------------------------------------

--
-- Structure de la table `Messages`
--

CREATE TABLE `Messages` (
  `id` int NOT NULL,
  `body` varchar(255) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Messages`
--

INSERT INTO `Messages` (`id`, `body`, `picture`, `createdAt`, `updatedAt`, `UserId`) VALUES
(4, 'Hello!!! Cet espace est modéré, mais tant que vous restez courtois tout se passera bien! Je vous souhaite une bonne journée!', 'http://localhost:3000/images/soleil1.jpeg1658782649391.jpg', '2022-07-20 12:42:23', '2022-07-25 20:57:29', 5),
(52, 'Groupomania > Facebook', 'http://localhost:3000/images/Meme.png1658850827097.png', '2022-07-24 14:16:49', '2022-07-26 15:53:47', 24),
(57, 'Coucou! C\'est génial ici! Y\'a du monde que je connais? ', NULL, '2022-07-25 20:21:33', '2022-07-25 20:21:33', 27),
(60, 'C\'est dans le bon ordre?', NULL, '2022-07-25 21:08:36', '2022-07-25 21:08:36', 5),
(62, 'Alors vous racontez quoi de beau? ', NULL, '2022-07-26 10:19:25', '2022-07-26 10:19:25', 29),
(63, 'Bonjour les amis! C\'est mieux que twitter ici vous trouvez pas?', 'http://localhost:3000/images/graham-holtshausen-fUnfEz3VLv4-unsplash.jpg1658831369817.jpg', '2022-07-26 10:25:48', '2022-07-26 10:29:29', 30),
(64, 'Content de tous vous retrouver ça fait longtemps!', 'http://localhost:3000/images/ecureuil.jpg1658850808233.jpg', '2022-07-26 15:46:14', '2022-07-26 15:53:28', 32);

-- --------------------------------------------------------

--
-- Structure de la table `Users`
--

CREATE TABLE `Users` (
  `id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `picture` varchar(255) DEFAULT 'http://localhost:3000/images/default-profile.png',
  `isAdmin` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `Users`
--

INSERT INTO `Users` (`id`, `email`, `firstName`, `password`, `picture`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(5, 'admin@gmail.com', 'Admin', '$2b$10$ljU.i9NVsZ5jET/7wM.5n.W3m4nWGygfUulm/OVZ6b4qWygJvAZf2', 'http://localhost:3000/images/profil.jpg1658580080071.jpg', 1, '2022-07-20 12:42:10', '2022-07-23 13:12:35'),
(22, 'maximenicolau33@gmail.com', 'Maxime', '$2b$10$/nKzm92Jk3taY4CewYIf3umH/GhrsxqrrILnedLoo6zP8PxH0H7I6', 'http://localhost:3000/images/profil2.jpg1658764482313.jpg', 0, '2022-07-24 13:45:28', '2022-07-25 15:54:42'),
(24, 'leo@gmail.com', 'Leo', '$2b$10$nSiEy1ccvQU4gF.lvPsJPuLN/EG2NLTCuj/AL4BuhwlnH0w/KVyKS', 'http://localhost:3000/images/perroquet.jpg1658684382382.jpg', 0, '2022-07-24 13:54:25', '2022-07-24 17:39:42'),
(27, 'bobby@gmail.com', 'Bobby', '$2b$10$n3AZH1vvau1rSfanqzFAku0BOZjO0GR.RI3BV/eTmac.vo896.v8O', 'http://localhost:3000/images/chien.jpg1658780464181.jpg', 0, '2022-07-25 20:20:12', '2022-07-25 20:21:04'),
(28, 'jean@gmail.com', 'Doume', '$2b$10$H8SRsDU2x8fr6venh.wAk.jyTqB3zINJSyb2zKgN5JCnxi/XB.Kw6', 'http://localhost:3000/images/profil3.jpg1658782345848.jpg', 0, '2022-07-25 20:44:45', '2022-07-25 20:52:25'),
(29, 'd3@gmail.com', 'Dams', '$2b$10$okdhHHEkjuIMZmT82IVc3.UsENRtoWzya2Eltf2lYsecD7yxW1tu2', 'http://localhost:3000/images/graham-holtshausen-fUnfEz3VLv4-unsplash.jpg1658830828829.jpg', 0, '2022-07-26 10:18:46', '2022-07-26 10:20:28'),
(30, 'martine@gmail.com', 'Martine', '$2b$10$T/Pl8Day8Ujxfu5xI/6sfe45xzHaOS5cDDIaS18C4dgW3vEk8X97q', 'http://localhost:3000/images/jonatan-pie-3l3RwQdHRHg-unsplash.jpg1658848310208.jpg', 0, '2022-07-26 10:25:10', '2022-07-26 15:41:09'),
(32, 'belminio@gmail.com', 'Toms', '$2b$10$IF86kTspn62OP5RmewEztufinPTbXXimqvTJ3n7cJbmo4RP7yE6ZS', 'http://localhost:3000/images/soleil1.jpeg1658850355775.jpg', 0, '2022-07-26 15:45:38', '2022-07-26 15:45:55');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Likes`
--
ALTER TABLE `Likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `MessageId` (`MessageId`),
  ADD KEY `UserId` (`UserId`);

--
-- Index pour la table `Messages`
--
ALTER TABLE `Messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`);

--
-- Index pour la table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Likes`
--
ALTER TABLE `Likes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT pour la table `Messages`
--
ALTER TABLE `Messages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT pour la table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Likes`
--
ALTER TABLE `Likes`
  ADD CONSTRAINT `Likes_ibfk_207` FOREIGN KEY (`MessageId`) REFERENCES `Messages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Likes_ibfk_208` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Messages`
--
ALTER TABLE `Messages`
  ADD CONSTRAINT `Messages_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
