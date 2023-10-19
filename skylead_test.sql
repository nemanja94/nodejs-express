-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 19, 2023 at 12:19 PM
-- Server version: 8.0.34-0ubuntu0.22.04.1
-- PHP Version: 8.1.2-1ubuntu2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `skylead_test`
--
CREATE DATABASE IF NOT EXISTS `skylead_test` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
USE `skylead_test`;

-- --------------------------------------------------------

--
-- Table structure for table `trello_task`
--

DROP TABLE IF EXISTS `trello_task`;
CREATE TABLE IF NOT EXISTS `trello_task` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `assigned_user_id` int NOT NULL,
  `status_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `assigned_user_id` (`assigned_user_id`),
  KEY `status_id` (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `trello_task`
--

INSERT INTO `trello_task` (`id`, `title`, `description`, `assigned_user_id`, `status_id`) VALUES
(1, 'Task 1', 'Description for Task 1', 1, 1),
(2, 'Task 2', 'Description for Task 2', 2, 2),
(3, 'Task test update', 'Task Description Test update', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `trello_task_status`
--

DROP TABLE IF EXISTS `trello_task_status`;
CREATE TABLE IF NOT EXISTS `trello_task_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` enum('Todo','In Progress','Done') CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT 'Todo',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `trello_task_status`
--

INSERT INTO `trello_task_status` (`id`, `status`) VALUES
(1, 'Todo'),
(2, 'In Progress'),
(3, 'Done');

-- --------------------------------------------------------

--
-- Table structure for table `trello_user`
--

DROP TABLE IF EXISTS `trello_user`;
CREATE TABLE IF NOT EXISTS `trello_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `trello_user`
--

INSERT INTO `trello_user` (`id`, `name`, `email`) VALUES
(1, 'Nemanja', 'nemanja@mail.com'),
(2, 'Stefan', 'stefan@mail.com');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `trello_task`
--
ALTER TABLE `trello_task`
  ADD CONSTRAINT `trello_task_ibfk_1` FOREIGN KEY (`assigned_user_id`) REFERENCES `trello_user` (`id`),
  ADD CONSTRAINT `trello_task_ibfk_2` FOREIGN KEY (`status_id`) REFERENCES `trello_task_status` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
