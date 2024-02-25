-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 25, 2024 at 06:22 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `plumbers`
--

-- --------------------------------------------------------

--
-- Table structure for table `plumbers`
--

CREATE TABLE `plumbers` (
  `id` int(11) NOT NULL,
  `plumber_full_names` varchar(70) DEFAULT NULL,
  `plumber_email` varchar(70) DEFAULT NULL,
  `plumber_password` varchar(250) DEFAULT NULL,
  `location` varchar(250) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `town` int(50) DEFAULT NULL,
  `locality` int(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `plumbers`
--

INSERT INTO `plumbers` (`id`, `plumber_full_names`, `plumber_email`, `plumber_password`, `location`, `city`, `town`, `locality`) VALUES
(1, 'nelson lemein', 'nelson@gmail.com', '123456', NULL, NULL, NULL, NULL),
(2, 'Lean Onishi', 'lean@gmail.com', '123456', NULL, NULL, NULL, NULL),
(3, 'Abigael Areso', 'areso@gmail.com', '123456', NULL, NULL, NULL, NULL),
(4, 'William Macknon', 'non@gmail.com', '123456', 'Latitude: -1.2920659, Longitude: 36.8219462', NULL, NULL, NULL),
(5, 'Liam', 'liam@gmail.com', '123456', 'Latitude: -1.2920659, Longitude: 36.8219462', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `plumbers`
--
ALTER TABLE `plumbers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `plumbers`
--
ALTER TABLE `plumbers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
