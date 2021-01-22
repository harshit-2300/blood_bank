-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 22, 2021 at 11:12 AM
-- Server version: 5.7.31
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blood_bank`
--

-- --------------------------------------------------------

--
-- Table structure for table `blood_bag`
--

DROP TABLE IF EXISTS `blood_bag`;
CREATE TABLE IF NOT EXISTS `blood_bag` (
  `BBID` int(11) NOT NULL AUTO_INCREMENT,
  `BLID` int(11) NOT NULL,
  `blood_group` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT '1',
  `rejected` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`BBID`),
  KEY `BLID` (`BLID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `blood_bank`
--

DROP TABLE IF EXISTS `blood_bank`;
CREATE TABLE IF NOT EXISTS `blood_bank` (
  `BLID` int(11) NOT NULL AUTO_INCREMENT,
  `LID` int(10) NOT NULL,
  `branch_name` varchar(50) NOT NULL,
  `branch_location` varchar(255) NOT NULL,
  `contact_number` int(12) NOT NULL,
  PRIMARY KEY (`BLID`),
  KEY `LID` (`LID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `blood_donation_camp`
--

DROP TABLE IF EXISTS `blood_donation_camp`;
CREATE TABLE IF NOT EXISTS `blood_donation_camp` (
  `BDCID` int(11) NOT NULL AUTO_INCREMENT,
  `LID` int(11) DEFAULT NULL,
  `camp_start` datetime DEFAULT NULL,
  `camo_end` datetime DEFAULT NULL,
  `camp_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`BDCID`),
  KEY `LID` (`LID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `donation_record`
--

DROP TABLE IF EXISTS `donation_record`;
CREATE TABLE IF NOT EXISTS `donation_record` (
  `DID` int(11) NOT NULL AUTO_INCREMENT,
  `PID` int(10) NOT NULL,
  `LID` int(10) NOT NULL,
  `donation_date` date NOT NULL,
  `amount_donated` int(10) NOT NULL,
  `BBID` int(10) NOT NULL,
  PRIMARY KEY (`DID`),
  KEY `PID` (`PID`),
  KEY `LID` (`LID`),
  KEY `BBID` (`BBID`),
  KEY `BBID_2` (`BBID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `donor`
--

DROP TABLE IF EXISTS `donor`;
CREATE TABLE IF NOT EXISTS `donor` (
  `PID` int(10) NOT NULL,
  `blood_group` varchar(50) DEFAULT NULL,
  `weight` int(100) NOT NULL,
  `height` int(200) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `next_donation_date` date DEFAULT NULL,
  `previous_sms_date` date DEFAULT NULL,
  PRIMARY KEY (`PID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
CREATE TABLE IF NOT EXISTS `location` (
  `LID` int(11) NOT NULL AUTO_INCREMENT,
  `PINCODE` int(11) NOT NULL,
  `Locality` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`LID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `people`
--

DROP TABLE IF EXISTS `people`;
CREATE TABLE IF NOT EXISTS `people` (
  `PID` int(10) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) DEFAULT NULL,
  `blood_group` varchar(50) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `phone_number` bigint(12) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `verified` tinyint(1) NOT NULL DEFAULT '0',
  `gender` varchar(10) NOT NULL,
  PRIMARY KEY (`PID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
CREATE TABLE IF NOT EXISTS `request` (
  `REID` int(11) NOT NULL AUTO_INCREMENT,
  `request_date` date NOT NULL,
  `blood_group` varchar(10) NOT NULL,
  `quantity` int(10) NOT NULL,
  `PID` int(10) NOT NULL,
  `accepted` tinyint(1) NOT NULL DEFAULT '0',
  `uploaded_file` text NOT NULL,
  PRIMARY KEY (`REID`),
  KEY `PID` (`PID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `reveived_record`
--

DROP TABLE IF EXISTS `reveived_record`;
CREATE TABLE IF NOT EXISTS `reveived_record` (
  `RID` int(11) NOT NULL AUTO_INCREMENT,
  `REID` int(11) NOT NULL,
  `received_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `amount` int(11) NOT NULL,
  `BBID` int(11) NOT NULL,
  PRIMARY KEY (`RID`),
  KEY `REID` (`REID`),
  KEY `BBID` (`BBID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `sms`
--

DROP TABLE IF EXISTS `sms`;
CREATE TABLE IF NOT EXISTS `sms` (
  `SMSID` int(11) NOT NULL AUTO_INCREMENT,
  `PID` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `type` varchar(50) DEFAULT 'not specified',
  PRIMARY KEY (`SMSID`),
  KEY `PID` (`PID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blood_bag`
--
ALTER TABLE `blood_bag`
  ADD CONSTRAINT `blood_bag_ibfk_1` FOREIGN KEY (`BLID`) REFERENCES `blood_bank` (`BLID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `blood_bank`
--
ALTER TABLE `blood_bank`
  ADD CONSTRAINT `blood_bank_ibfk_1` FOREIGN KEY (`LID`) REFERENCES `location` (`LID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `blood_donation_camp`
--
ALTER TABLE `blood_donation_camp`
  ADD CONSTRAINT `blood_donation_camp_ibfk_1` FOREIGN KEY (`LID`) REFERENCES `location` (`LID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `donation_record`
--
ALTER TABLE `donation_record`
  ADD CONSTRAINT `donation_record_ibfk_1` FOREIGN KEY (`PID`) REFERENCES `donor` (`PID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `donation_record_ibfk_2` FOREIGN KEY (`BBID`) REFERENCES `blood_bag` (`BBID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `donor`
--
ALTER TABLE `donor`
  ADD CONSTRAINT `donor_ibfk_1` FOREIGN KEY (`PID`) REFERENCES `people` (`PID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `request`
--
ALTER TABLE `request`
  ADD CONSTRAINT `request_ibfk_1` FOREIGN KEY (`PID`) REFERENCES `people` (`PID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reveived_record`
--
ALTER TABLE `reveived_record`
  ADD CONSTRAINT `reveived_record_ibfk_1` FOREIGN KEY (`REID`) REFERENCES `request` (`REID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reveived_record_ibfk_2` FOREIGN KEY (`BBID`) REFERENCES `blood_bag` (`BBID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sms`
--
ALTER TABLE `sms`
  ADD CONSTRAINT `sms_ibfk_1` FOREIGN KEY (`PID`) REFERENCES `people` (`PID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
