-- phpMyAdmin SQL Dump
-- version 4.0.9
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 28. Dez 2013 um 14:06
-- Server Version: 5.5.34
-- PHP-Version: 5.4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `todolist`
--
CREATE DATABASE IF NOT EXISTS `todolist` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `todolist`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `todo`
--

DROP TABLE IF EXISTS `todo`;
CREATE TABLE IF NOT EXISTS `todo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `notes` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `created_date` date NOT NULL,
  `due_date` date NOT NULL,
  `author` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `version` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Daten für Tabelle `todo`
--

INSERT INTO `todo` (`id`, `title`, `notes`, `created_date`, `due_date`, `author`, `version`) VALUES
(1, 'Auch das noch', 'Auch das ist noch zu tun', '2021-04-08', '2021-08-03', 'Sebastian', 1),
(2, 'Darüber hinaus noch etwas', 'Darüber hinaus ist noch etwas zu tun', '2022-04-08', '2022-10-03', 'Marc', 1),
(3, 'Dies', 'Dies ist noch zu tun', '2021-04-08', '2022-10-04', 'Marc', 1),
(4, 'Hier das noch <besonders wichtig>', 'Hier das ist noch zu tun', '2021-04-08', '2022-10-10', 'Marc', 1),
(5, 'Noch mehr', 'Noch mehr ist zu tun', '2021-04-08', '2022-10-23', 'Sebastian', 1),
(6, 'Das', 'Das ist noch zu tun', '2021-04-08', '2022-11-17', 'Patric', 1),
(7, 'Jenes', 'Jenes ist noch zu tun', '2021-04-08', '2022-12-21', 'Marc', 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
