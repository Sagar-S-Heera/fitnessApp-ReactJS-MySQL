-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 07, 2023 at 11:19 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gym-management`
--

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `ClassID` int(11) NOT NULL,
  `ClassName` varchar(30) DEFAULT NULL,
  `Type` varchar(25) DEFAULT NULL,
  `TrainerID` int(11) DEFAULT NULL,
  `StartTime` datetime DEFAULT NULL,
  `EndTime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`ClassID`, `ClassName`, `Type`, `TrainerID`, `StartTime`, `EndTime`) VALUES
(1, 'Strength Training 101', 'Strength Training', 1, '2022-01-01 09:00:00', '2022-01-01 10:00:00'),
(2, 'Beginner Yoga', 'Yoga', 2, '2022-01-01 11:00:00', '2022-01-01 12:00:00'),
(3, 'Advanced Strength Training', 'Strength Training', 1, '2022-01-02 09:00:00', '2022-01-02 10:00:00'),
(4, 'Intermediate Yoga', 'Yoga', 2, '2022-01-02 11:00:00', '2022-01-02 12:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `enrollments`
--

CREATE TABLE `enrollments` (
  `EnrollmentID` int(11) NOT NULL,
  `MemberID` int(11) NOT NULL,
  `ClassID` int(11) DEFAULT NULL,
  `Active` varchar(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enrollments`
--

INSERT INTO `enrollments` (`EnrollmentID`, `MemberID`, `ClassID`, `Active`) VALUES
(2, 1, 3, 'Yes'),
(3, 3, 3, 'Yes'),
(5, 5, 2, 'No'),
(7, 7, 1, 'Yes'),
(8, 1, 2, 'Yes');

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `MemberID` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Phone` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`MemberID`, `Name`, `Address`, `Phone`, `Email`) VALUES
(1, 'John doe', '123 Main St', '111-111-1111', 'JohnDoe@email.com'),
(2, 'Jane Doe', '456 Market St', '987-654-3210', 'janedoe@email.com'),
(3, 'Bob Johnson', '789 Elm St', '222-222-2222', 'bobjohnson@email.com'),
(5, 'Jane Dows', '135 Oak St', '333-333-3333	', 'janedows@email.com'),
(7, 'Michael Johnson', '243 Cedar Blvd', '555-555-5555', 'michaeljohnson@email.com'),
(8, 'Emily Davis', '567 Maple Ave', '666-666-6666', 'emilydavis@email.com'),
(9, 'William', '987 Elm St.', '777-777-7777', 'william@email.com'),
(10, 'Will Smith', '23 Baker St', '121-121-2121', 'willSmith@email.com');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `PaymentID` int(11) NOT NULL,
  `MemberID` int(11) DEFAULT NULL,
  `PaymentDate` datetime DEFAULT NULL,
  `Amount` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`PaymentID`, `MemberID`, `PaymentDate`, `Amount`) VALUES
(1, 1, '2022-01-01 00:00:00', '100.00'),
(3, 3, '2022-03-01 00:00:00', '200.00');

-- --------------------------------------------------------

--
-- Table structure for table `trainers`
--

CREATE TABLE `trainers` (
  `TrainerID` int(11) NOT NULL,
  `Name` varchar(25) DEFAULT NULL,
  `Specialization` varchar(25) DEFAULT NULL,
  `Phone` varchar(10) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `trainers`
--

INSERT INTO `trainers` (`TrainerID`, `Name`, `Specialization`, `Phone`, `Email`) VALUES
(1, 'Mike Smith', 'Strength Training', '123-456-78', 'mikesmith@email.com'),
(2, 'Amy Jones', 'Yoga', '987-654-32', 'amyjones@email.com'),
(3, 'Tom Brown', 'Cardio Training', '555-555-55', 'tombrown@email.com'),
(4, 'Janet Green', 'Pilates', '666-666-66', 'janetgreen@email.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`ClassID`),
  ADD KEY `TrainerID` (`TrainerID`);

--
-- Indexes for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD PRIMARY KEY (`EnrollmentID`,`MemberID`),
  ADD KEY `MemberID` (`MemberID`),
  ADD KEY `ClassID` (`ClassID`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`MemberID`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`PaymentID`),
  ADD KEY `MemberID` (`MemberID`);

--
-- Indexes for table `trainers`
--
ALTER TABLE `trainers`
  ADD PRIMARY KEY (`TrainerID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `classes`
--
ALTER TABLE `classes`
  ADD CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`TrainerID`) REFERENCES `trainers` (`TrainerID`);

--
-- Constraints for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD CONSTRAINT `enrollments_ibfk_1` FOREIGN KEY (`MemberID`) REFERENCES `members` (`MemberID`) ON DELETE CASCADE,
  ADD CONSTRAINT `enrollments_ibfk_2` FOREIGN KEY (`ClassID`) REFERENCES `classes` (`ClassID`) ON DELETE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`MemberID`) REFERENCES `members` (`MemberID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
