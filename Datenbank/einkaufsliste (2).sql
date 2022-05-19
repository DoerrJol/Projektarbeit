-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 19. Mai 2022 um 19:06
-- Server-Version: 10.4.22-MariaDB
-- PHP-Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `einkaufsliste`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `allelisten`
--

CREATE TABLE `allelisten` (
  `listenid` int(11) NOT NULL,
  `titel` varchar(255) COLLATE utf8mb4_german2_ci NOT NULL,
  `status` tinyint(1) NOT NULL,
  `listenversion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_german2_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `einkaufszettel`
--

CREATE TABLE `einkaufszettel` (
  `zettelid` int(11) NOT NULL,
  `listenid` int(11) NOT NULL,
  `artikelid` int(11) NOT NULL,
  `menge` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_german2_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `produkte`
--

CREATE TABLE `produkte` (
  `artikelid` int(11) NOT NULL,
  `bezeichnung` varchar(255) COLLATE utf8mb4_german2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_german2_ci;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `allelisten`
--
ALTER TABLE `allelisten`
  ADD PRIMARY KEY (`listenid`);

--
-- Indizes für die Tabelle `einkaufszettel`
--
ALTER TABLE `einkaufszettel`
  ADD PRIMARY KEY (`zettelid`),
  ADD KEY `listenid` (`listenid`,`artikelid`),
  ADD KEY `artikelid` (`artikelid`);

--
-- Indizes für die Tabelle `produkte`
--
ALTER TABLE `produkte`
  ADD PRIMARY KEY (`artikelid`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `allelisten`
--
ALTER TABLE `allelisten`
  MODIFY `listenid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `einkaufszettel`
--
ALTER TABLE `einkaufszettel`
  MODIFY `zettelid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `produkte`
--
ALTER TABLE `produkte`
  MODIFY `artikelid` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `allelisten`
--
ALTER TABLE `allelisten`
  ADD CONSTRAINT `allelisten_ibfk_1` FOREIGN KEY (`listenid`) REFERENCES `einkaufszettel` (`listenid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `einkaufszettel`
--
ALTER TABLE `einkaufszettel`
  ADD CONSTRAINT `einkaufszettel_ibfk_1` FOREIGN KEY (`artikelid`) REFERENCES `produkte` (`artikelid`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
