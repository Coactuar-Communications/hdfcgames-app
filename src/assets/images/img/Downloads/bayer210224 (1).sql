-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 05, 2024 at 07:13 AM
-- Server version: 5.7.40-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bayer210224`
--

-- --------------------------------------------------------

--
-- Table structure for table `poll`
--

CREATE TABLE `poll` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `feedback` text NOT NULL,
  `suggestions` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `poll`
--

INSERT INTO `poll` (`id`, `name`, `email`, `feedback`, `suggestions`) VALUES
(1, 'test', 'test@test.co.in', '5', 'test'),
(2, 'Divakar', 'divakar.murulidhar.ext@bayer.com', '5', 'Good'),
(3, 'Muthu Coactuar Testing', 'muthu@coact.co.in', '5', 'Good testing done'),
(4, '', '', '5', 'Testing done'),
(5, 'Muthu Coactuar Testing', 'muthu@coact.co.in', '5', 'Audio check'),
(6, 'Devaraju', 'devaraju.hr@bayer.com', '5', '.'),
(7, 'JAGADEESHA M', 'jagadeesha.m@bayer.com', '5', 'All good'),
(8, 'Akshay K S', 'akshay.ks@bayer.com', '5', 'Great Informative session'),
(9, 'Axatha', 'Axatha.panduranga@bayer.com', '4', 'Good'),
(10, 'Madhusudhan', 'madhusudhan.hanumanth@bayer.com', '5', 'Good'),
(11, 'Divakar', 'divakar.murulidhar.ext@bayer.com', '5', 'Good'),
(12, 'Princy Ann Jacob', 'princy.annjacob@bayer.com', '5', 'fd'),
(13, 'Muthu Coactuar Testing', 'muthu@coact.co.in', '5', 'Event concluded'),
(14, 'Muthu Coactuar Testing', 'muthu@coact.co.in', '5', '.'),
(15, 'Accamma Nachappa', 'accamma.nachappa@bayer.com', '3', 'All the town halls are in the same format. Bring in something new and interesting'),
(16, 'test', 'rumana@coact.co.in', '4', 'g'),
(17, 'Muthu Coactuar Testing', 'muthu@coact.co.in', '5', 'Good'),
(18, 'Devaraju', 'devaraju.hr@bayer.com', '5', 'Na');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_questions`
--

CREATE TABLE `tbl_questions` (
  `id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_question` varchar(500) NOT NULL,
  `asked_at` datetime NOT NULL,
  `eventname` varchar(255) NOT NULL,
  `speaker` int(11) NOT NULL DEFAULT '0',
  `answered` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_questions`
--

INSERT INTO `tbl_questions` (`id`, `user_name`, `user_email`, `user_question`, `asked_at`, `eventname`, `speaker`, `answered`) VALUES
(1, 'anonymous', 'anonymous', 'test', '2024-02-21 11:41:38', 'ajantanetalo3011', 0, 0),
(2, 'anonymous', 'anonymous', 'test', '2024-02-21 11:41:42', 'ajantanetalo3011', 0, 0),
(3, 'Mrinal Banerjee', 'mrinal.banerjee@bayer.com', 'Formula 1: whoâ€™s your all time favourite driver', '2024-02-21 15:19:04', 'ajantanetalo3011', 0, 0),
(4, 'anonymous', 'anonymous', 'Dear Simon, past year we had pay hike effective from August, do we foresee a similar push this year as well ? Thank you.', '2024-02-21 15:27:07', 'ajantanetalo3011', 0, 0),
(5, 'anonymous', 'anonymous', 'who is your favourite footballer??', '2024-02-21 15:29:20', 'ajantanetalo3011', 0, 0),
(6, 'Mrinal Banerjee', 'mrinal.banerjee@bayer.com', 'Hi Simon, Bayer is not doing very well and itâ€™s reflecting on global share prices. However the Indian share price is in its all time high. Whatâ€™s driving the India growth story ', '2024-02-21 15:35:48', 'ajantanetalo3011', 0, 0),
(7, 'anonymous', 'anonymous', 'Hi, do we get bonus in April?', '2024-02-21 15:41:01', 'ajantanetalo3011', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_email` varchar(500) NOT NULL,
  `mobile_num` varchar(15) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `speciality` varchar(100) DEFAULT NULL,
  `reg_no` varchar(50) DEFAULT NULL,
  `joining_date` datetime NOT NULL,
  `login_date` datetime DEFAULT NULL,
  `logout_date` datetime DEFAULT NULL,
  `logout_status` int(11) NOT NULL DEFAULT '0' COMMENT '1=loggedin',
  `eventname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`id`, `user_name`, `user_email`, `mobile_num`, `location`, `speciality`, `reg_no`, `joining_date`, `login_date`, `logout_date`, `logout_status`, `eventname`) VALUES
(1, 'test', 'test@test.co.in', NULL, NULL, NULL, NULL, '2024-02-21 11:41:29', '2024-02-21 11:42:37', '2024-02-21 12:41:48', 0, 'ajantanetalo3011'),
(2, 'gagan', 'gagan.trikha.ext@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 12:26:34', '2024-02-21 14:02:49', '2024-02-21 14:09:25', 0, 'ajantanetalo3011'),
(3, 'Lijo', 'lijo@coact.co.in', NULL, NULL, NULL, NULL, '2024-02-21 12:26:40', '2024-02-21 15:09:30', '2024-02-21 15:14:02', 0, 'ajantanetalo3011'),
(4, 'sufiyan', 'sufiyan@coact.co.in', NULL, NULL, NULL, NULL, '2024-02-21 12:27:23', '2024-02-21 12:27:23', '2024-02-21 16:28:41', 0, 'ajantanetalo3011'),
(5, 'Divakar', 'divakar.murulidhar.ext@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 12:30:58', '2024-02-21 14:16:53', '2024-02-21 15:51:23', 0, 'ajantanetalo3011'),
(6, 'Darshan', 'darshan.ravindrakumar.ext@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 12:31:01', '2024-02-21 12:39:37', '2024-02-21 15:51:08', 0, 'ajantanetalo3011'),
(7, 'Logesh R', 'logesh.rajendran.ext@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 12:31:09', '2024-02-21 15:08:22', '2024-02-21 15:52:52', 0, 'ajantanetalo3011'),
(8, 'Muthu Kumar ', 'muthu@coact.co.in', NULL, NULL, NULL, NULL, '2024-02-21 12:54:14', '2024-09-04 15:53:04', '2024-09-04 15:53:34', 0, 'ajantanetalo3011'),
(9, 'Lijo', 'j.lijogg@gmail.com', NULL, NULL, NULL, NULL, '2024-02-21 14:02:15', '2024-02-21 14:02:15', '2024-02-21 14:08:43', 0, 'ajantanetalo3011'),
(10, 'gagan', 'gagan@outlook.com', NULL, NULL, NULL, NULL, '2024-02-21 14:10:06', '2024-02-21 14:10:06', '2024-02-21 15:59:12', 0, 'ajantanetalo3011'),
(11, 'NIDHI NAIK', 'nidhi.naik@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 14:58:29', '2024-02-21 14:58:29', '2024-02-21 15:47:30', 0, 'ajantanetalo3011'),
(12, 'Vanishree', 'vanishree.shivaramaiah@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 14:59:21', '2024-02-21 14:59:21', '2024-02-21 16:01:49', 0, 'ajantanetalo3011'),
(13, 'Jyoti Sankar Nayak', 'jyotisankar.nayak@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:00:22', '2024-02-21 15:00:22', '2024-02-21 15:51:23', 0, 'ajantanetalo3011'),
(14, 'Nobin VR', 'Nobin.vr@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:00:30', '2024-02-21 15:08:08', '2024-02-21 15:55:08', 0, 'ajantanetalo3011'),
(15, 'Veena Hegde', 'veena.hegde@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:00:49', '2024-02-21 15:00:49', '2024-02-21 15:51:51', 0, 'ajantanetalo3011'),
(16, 'Madhusudhan', 'madhusudhan.hanumanth@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:00:52', '2024-02-21 15:00:52', '2024-02-21 15:50:52', 0, 'ajantanetalo3011'),
(17, 'Pradeepa C A', 'pradeepa.ca@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:00:52', '2024-02-21 15:00:52', '2024-02-21 15:51:24', 0, 'ajantanetalo3011'),
(18, 'JAGADEESHA M', 'jagadeesha.m@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:00:56', '2024-02-21 15:00:56', '2024-02-21 15:50:58', 0, 'ajantanetalo3011'),
(19, 'Baisakhi mukherjee', 'baisakhi.mukherjee@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:01:00', '2024-02-21 15:01:00', '2024-02-21 15:51:00', 0, 'ajantanetalo3011'),
(20, 'Amey', 'amey.gargatte@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:01:00', '2024-02-21 15:01:00', '2024-02-21 15:51:01', 0, 'ajantanetalo3011'),
(21, 'Kanifnath', 'kanifnath.shinde@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:01:09', '2024-02-21 15:01:09', '2024-02-21 15:51:40', 0, 'ajantanetalo3011'),
(22, 'Phanindra N', 'Phanindra.n@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:01:27', '2024-02-21 15:01:27', '2024-02-21 15:51:29', 0, 'ajantanetalo3011'),
(23, 'Arpitha.r', 'Arpitha.r@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:01:29', '2024-02-21 15:02:10', '2024-02-21 15:52:49', 0, 'ajantanetalo3011'),
(24, 'Kishore', 'kishore.kommanapalli@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:01:48', '2024-02-21 15:01:48', '2024-02-21 15:56:21', 0, 'ajantanetalo3011'),
(25, 'Kailash ', 'Kailash.maneyk@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:01:57', '2024-02-21 15:01:57', '2024-02-21 15:51:28', 0, 'ajantanetalo3011'),
(26, 'REVANNA MUNDRAGI', 'revanna.mudragi@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:02:12', '2024-02-21 15:02:12', '2024-02-21 15:51:14', 0, 'ajantanetalo3011'),
(27, 'Princy Ann Jacob', 'princy.annjacob@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:02:18', '2024-02-21 15:02:18', '2024-02-21 15:52:20', 0, 'ajantanetalo3011'),
(28, 'Shubha Ramesh', 'shubha.ramesh@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:02:31', '2024-02-21 15:02:31', '2024-02-21 15:51:02', 0, 'ajantanetalo3011'),
(29, 'Suhani Jain', 'suhani.jain@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:02:31', '2024-02-21 15:02:31', '2024-02-21 15:40:01', 0, 'ajantanetalo3011'),
(30, 'Anantha Krishna Bhat T', 'ananthakrishna.bhat.t@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:02:34', '2024-02-21 15:28:49', '2024-02-21 15:51:20', 0, 'ajantanetalo3011'),
(31, 'Sameena Begum', 'sameena.begum1@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:02:35', '2024-02-21 15:02:35', '2024-02-21 15:51:07', 0, 'ajantanetalo3011'),
(32, 'Shreekanth V', 'Shreekanth.v@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:02:46', '2024-02-21 15:02:46', '2024-02-21 15:03:49', 0, 'ajantanetalo3011'),
(33, 'Vishnu Sharma', 'vishnu.sharma2@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:03:03', '2024-02-21 15:03:03', '2024-02-21 15:51:04', 0, 'ajantanetalo3011'),
(34, 'Lakshmi V', 'lakshmi.v@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:03:03', '2024-02-21 15:03:03', '2024-02-21 15:31:36', 0, 'ajantanetalo3011'),
(35, 's sravan kumar', 'ssravan.kumar@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:03:04', '2024-02-21 15:03:04', '2024-02-21 16:03:24', 0, 'ajantanetalo3011'),
(36, 'Mukunda C', 'mukunda.c@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:03:13', '2024-02-21 15:03:13', '2024-02-21 15:04:44', 0, 'ajantanetalo3011'),
(37, 'Deeksha Salian', 'deeksha.salian@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:03:29', '2024-02-21 15:03:29', '2024-02-21 15:35:02', 0, 'ajantanetalo3011'),
(38, 'Jyothi Gowda', 'jyothi.gowda@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:03:53', '2024-02-21 15:03:53', '2024-02-21 15:51:54', 0, 'ajantanetalo3011'),
(39, 'Pallavi', 'pallavi.chandrashekhar@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:04:36', '2024-02-21 15:04:36', '2024-02-21 15:50:37', 0, 'ajantanetalo3011'),
(40, 'Jaya Prakash Narayan', 'jayaprakash.narayan@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:04:42', '2024-02-21 15:04:42', '2024-02-21 15:50:12', 0, 'ajantanetalo3011'),
(41, 'Kinjal Patel', 'kinjalben.patel@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:05:07', '2024-02-21 15:05:07', '2024-02-21 15:05:37', 0, 'ajantanetalo3011'),
(42, 'Mrinal Banerjee', 'mrinal.banerjee@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:05:26', '2024-02-21 15:05:26', '2024-02-21 15:51:27', 0, 'ajantanetalo3011'),
(43, 'Gayatri Keshavamurthy', 'gayatri.keshavamurthy@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:05:30', '2024-02-21 15:05:30', '2024-02-21 15:51:01', 0, 'ajantanetalo3011'),
(44, 'Meghana Hegade', 'meghana.hegade@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:06:06', '2024-02-21 15:06:06', '2024-02-21 15:34:01', 0, 'ajantanetalo3011'),
(45, 'Bandi Raghu Rami Reddy', 'bandi.raghuramireddy@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:06:42', '2024-02-21 15:06:42', '2024-02-21 16:12:44', 0, 'ajantanetalo3011'),
(46, 'Shrikrishna', 'Shrikrishna.Dhavale@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:07:25', '2024-02-21 15:07:25', '2024-02-21 15:51:26', 0, 'ajantanetalo3011'),
(47, 'Nanaiah', 'nanaiahkushalappa.kandera@bayer.con', NULL, NULL, NULL, NULL, '2024-02-21 15:08:10', '2024-02-21 15:08:10', '2024-02-21 15:11:11', 0, 'ajantanetalo3011'),
(48, 'Amulya S', 'amulya.s@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:08:18', '2024-02-21 15:08:18', '2024-02-21 15:10:19', 0, 'ajantanetalo3011'),
(49, 'Zulekha.Bai.M', 'zulekha.baim@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:08:19', '2024-02-21 15:08:19', '2024-02-21 16:05:22', 0, 'ajantanetalo3011'),
(50, 'vineet kumar', 'vineet.kumar@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:08:19', '2024-02-21 15:08:19', '2024-02-21 15:57:27', 0, 'ajantanetalo3011'),
(51, 'Gopalkrishna', 'gopalkrishna.shastri@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:08:41', '2024-02-21 15:08:41', '2024-02-21 15:51:14', 0, 'ajantanetalo3011'),
(52, 'Shruthi E', 'Shruthi.e@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:09:14', '2024-02-21 15:09:14', '2024-02-21 15:54:49', 0, 'ajantanetalo3011'),
(53, 'Pragathi', 'pragathi.ks@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:09:56', '2024-02-21 15:09:56', '2024-02-21 15:50:57', 0, 'ajantanetalo3011'),
(54, 'Jithu', 'jithu.pk@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:10:36', '2024-02-21 15:10:36', '2024-02-21 15:41:07', 0, 'ajantanetalo3011'),
(55, 'Jayanth', 'Jayanth.r@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:10:38', '2024-02-21 15:10:38', '2024-02-21 15:51:09', 0, 'ajantanetalo3011'),
(56, 'Babina sharen', 'babina.sharen.ext@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:11:02', '2024-02-21 15:14:36', '2024-02-21 15:51:06', 0, 'ajantanetalo3011'),
(57, 'Accamma Nachappa', 'accamma.nachappa@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:11:05', '2024-02-21 15:11:05', '2024-02-21 16:02:07', 0, 'ajantanetalo3011'),
(58, 'Aparna', 'aparna.r@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:11:26', '2024-02-21 15:11:26', '2024-02-21 15:59:52', 0, 'ajantanetalo3011'),
(59, 'Kiran', 'johari.kiranv@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:11:31', '2024-02-21 15:11:31', '2024-02-21 15:32:32', 0, 'ajantanetalo3011'),
(60, 'punith', 'Punith.mr@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:11:33', '2024-02-21 15:11:33', '2024-02-21 15:51:34', 0, 'ajantanetalo3011'),
(61, 'Avinash V', 'avinash.v@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:11:47', '2024-02-21 15:11:47', '2024-02-21 15:51:18', 0, 'ajantanetalo3011'),
(62, 'Devaraju', 'devaraju.hr@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:11:47', '2024-09-04 21:57:51', '2024-09-04 21:58:21', 0, 'ajantanetalo3011'),
(63, 'Pavan', 'pavan.krishnamurthy@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:12:04', '2024-02-21 15:12:04', '2024-02-21 15:51:05', 0, 'ajantanetalo3011'),
(64, 'Uma Gnanabalan', 'umadevi.gnanabalan@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:12:05', '2024-02-21 15:12:05', '2024-02-21 15:53:54', 0, 'ajantanetalo3011'),
(65, 'abhishek hebbal', 'abhishek.hebbal@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:12:22', '2024-02-21 15:12:22', '2024-02-21 15:51:23', 0, 'ajantanetalo3011'),
(66, 'KG Eranna', 'kg.eranna@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:12:27', '2024-02-21 15:12:27', '2024-02-21 15:52:49', 0, 'ajantanetalo3011'),
(67, 'Akshaya S', 'akshaya.s@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:13:48', '2024-02-21 15:13:48', '2024-02-21 15:21:19', 0, 'ajantanetalo3011'),
(68, 'Preethi P', 'preethi.p@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:14:09', '2024-02-21 15:40:04', '2024-02-21 15:51:36', 0, 'ajantanetalo3011'),
(69, 'GMAFJ ', 'rohini.pkashyap@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:14:12', '2024-02-21 15:14:12', '2024-02-21 15:51:43', 0, 'ajantanetalo3011'),
(70, 'Swathi Vishwanath', 'swathi.vishwanath@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:14:20', '2024-02-21 15:14:20', '2024-02-21 15:51:20', 0, 'ajantanetalo3011'),
(71, 'Tejaswini MK', 'tejaswini.mk@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:14:20', '2024-02-21 15:14:20', '2024-02-21 15:47:51', 0, 'ajantanetalo3011'),
(72, 'Sharath M R', 'sharath.mr@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:14:37', '2024-02-21 15:14:37', '2024-02-21 15:51:38', 0, 'ajantanetalo3011'),
(73, 'GNMHL', 'manjunath.l@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:14:46', '2024-02-21 15:14:46', '2024-02-21 15:51:47', 0, 'ajantanetalo3011'),
(74, 'KUMAR', 'KUMAR.R@BAYER.COM', NULL, NULL, NULL, NULL, '2024-02-21 15:15:13', '2024-02-21 15:15:13', '2024-02-21 15:46:43', 0, 'ajantanetalo3011'),
(75, 'Sunil SV', 'sunil.sv@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:15:59', '2024-02-21 15:15:59', '2024-02-21 16:11:39', 0, 'ajantanetalo3011'),
(76, 'Abhinand Pisharody', 'abhinand.pisharody@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:16:01', '2024-02-21 15:16:01', '2024-02-21 15:50:31', 0, 'ajantanetalo3011'),
(77, 'Sachin', 'sachin.patil1@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:16:04', '2024-02-21 15:16:04', '2024-02-21 15:51:34', 0, 'ajantanetalo3011'),
(78, 'Prabhu Dev M S', 'Prabhudev.ms@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:16:16', '2024-02-21 15:16:16', '2024-02-21 16:47:52', 0, 'ajantanetalo3011'),
(79, 'Sravani G', 'Sravani.g@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:16:24', '2024-02-21 15:16:24', '2024-02-21 17:10:26', 0, 'ajantanetalo3011'),
(80, 'VISHAL RAO R', 'VISHAL.RAOR@BAYER.COM', NULL, NULL, NULL, NULL, '2024-02-21 15:16:32', '2024-02-21 15:16:32', '2024-02-21 15:52:46', 0, 'ajantanetalo3011'),
(81, 'Shashank Manjari', 'shashank.manjari@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:16:56', '2024-02-21 15:16:56', '2024-02-21 16:33:57', 0, 'ajantanetalo3011'),
(82, 'harish R', 'harish.r1@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:17:01', '2024-02-21 15:17:01', '2024-02-21 15:51:02', 0, 'ajantanetalo3011'),
(83, 'Divya ', 'divya.k@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:17:12', '2024-02-21 15:17:12', '2024-02-21 15:51:13', 0, 'ajantanetalo3011'),
(84, 'Neetu', 'neetu.r@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:17:16', '2024-02-21 15:17:16', '2024-02-21 15:50:47', 0, 'ajantanetalo3011'),
(85, 'Hari Prasad. M', 'hariprasad.m@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:18:05', '2024-02-21 15:18:05', '2024-02-21 16:03:55', 0, 'ajantanetalo3011'),
(86, 'Harshitha P', 'harshitha.p@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:19:26', '2024-02-21 15:19:26', '2024-02-21 16:53:06', 0, 'ajantanetalo3011'),
(87, 'Ramya', 'ramya.mohan@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:19:26', '2024-02-21 15:19:26', '2024-02-21 15:29:26', 0, 'ajantanetalo3011'),
(88, 'Neha', 'Neha.vishwakarma@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:20:09', '2024-02-21 15:34:37', '2024-02-21 15:51:08', 0, 'ajantanetalo3011'),
(89, 'Vaishnavi', 'vaishnavi.k@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:20:22', '2024-02-21 15:20:22', '2024-02-21 15:29:54', 0, 'ajantanetalo3011'),
(90, 'Midhun CM', 'midhun.cm@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:21:59', '2024-02-21 15:21:59', '2024-02-21 15:40:59', 0, 'ajantanetalo3011'),
(91, 'shivagami', 'shivagami.k@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:22:04', '2024-02-21 15:22:04', '2024-02-21 15:51:34', 0, 'ajantanetalo3011'),
(92, 'Divya Bharathi R', 'divyabharathi.r@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:22:16', '2024-02-21 15:22:16', '2024-02-21 15:39:49', 0, 'ajantanetalo3011'),
(93, 'Nabeel ', 'nabeelbadr.khan@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:26:25', '2024-02-21 15:26:25', '2024-02-21 16:01:37', 0, 'ajantanetalo3011'),
(94, 'Dilip Kumar', 'dilipkumar.p@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:27:28', '2024-02-21 15:27:28', '2024-02-21 15:51:30', 0, 'ajantanetalo3011'),
(95, 'Anuja R', 'anuja.r@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:27:42', '2024-02-21 15:27:42', '2024-02-21 15:51:43', 0, 'ajantanetalo3011'),
(96, 'claudia winslee lobo', 'claudiawinslee.lobo@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:27:45', '2024-02-21 15:27:45', '2024-02-21 15:33:16', 0, 'ajantanetalo3011'),
(97, 'Pooja Balaji', 'pooja.balaji@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:28:10', '2024-02-21 15:28:10', '2024-02-21 15:51:41', 0, 'ajantanetalo3011'),
(98, 'Salman Pasha', 'salman.pasha1@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:28:41', '2024-02-21 15:28:41', '2024-02-21 15:51:12', 0, 'ajantanetalo3011'),
(99, 'RAVI KUMAR T', 'ravikumar.t@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:29:23', '2024-02-21 15:29:23', '2024-02-21 15:31:24', 0, 'ajantanetalo3011'),
(100, 'Hemalatha P', 'hemalatha.p@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:29:35', '2024-02-21 15:29:35', '2024-02-21 15:54:06', 0, 'ajantanetalo3011'),
(101, 'Akshay K S', 'akshay.ks@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:30:06', '2024-02-21 15:30:06', '2024-02-21 15:51:07', 0, 'ajantanetalo3011'),
(102, 'Karthik R', 'karthik.r.ext@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:31:01', '2024-02-21 15:31:01', '2024-02-21 15:51:34', 0, 'ajantanetalo3011'),
(103, 'Adithi C', 'adithi.c@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:31:15', '2024-02-21 15:31:15', '2024-02-21 15:51:46', 0, 'ajantanetalo3011'),
(104, 'Khalandar ', 'khalandar.r@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:31:24', '2024-02-21 15:31:24', '2024-02-21 15:51:25', 0, 'ajantanetalo3011'),
(105, 'varshini', 'varshiniv.karanth@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:31:41', '2024-02-21 15:31:41', '2024-02-21 16:05:56', 0, 'ajantanetalo3011'),
(106, 'PAWAN KALYAN', 'pawan.kalyan@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:31:47', '2024-02-21 15:31:47', '2024-02-21 15:51:18', 0, 'ajantanetalo3011'),
(107, 'santhosh', 'santhosh.kumarp1@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:32:05', '2024-02-21 15:41:54', '2024-02-21 15:51:25', 0, 'ajantanetalo3011'),
(108, 'Rebecca', 'rebecca.philip@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:34:38', '2024-02-21 15:34:38', '2024-02-21 15:59:57', 0, 'ajantanetalo3011'),
(109, 'Shreya Kini', 'shreya.kini@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:36:31', '2024-02-21 15:36:31', '2024-02-21 15:51:32', 0, 'ajantanetalo3011'),
(110, 'Axatha', 'Axatha.panduranga@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:40:08', '2024-02-21 15:40:08', '2024-02-21 15:51:09', 0, 'ajantanetalo3011'),
(111, 'sandeep', 'sandeep.m@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:42:14', '2024-02-21 15:42:14', '2024-02-21 15:51:16', 0, 'ajantanetalo3011'),
(112, 'Saraswathi ', 'saraswathi@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:45:18', '2024-02-21 15:45:18', '2024-02-21 15:51:19', 0, 'ajantanetalo3011'),
(113, 'Rafeeq', 'rafeeq.shariff@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:49:53', '2024-02-21 15:49:53', '2024-02-21 15:51:24', 0, 'ajantanetalo3011'),
(114, 'Meetu', 'Meetu.sobhani@bayer.com', NULL, NULL, NULL, NULL, '2024-02-21 15:51:24', '2024-02-21 15:51:24', '2024-02-21 16:22:12', 0, 'ajantanetalo3011'),
(115, 'test', 'rumana@coact.co.in', NULL, NULL, NULL, NULL, '2024-05-29 11:50:08', '2024-09-04 14:34:21', '2024-09-04 14:34:51', 0, 'ajantanetalo3011');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `poll`
--
ALTER TABLE `poll`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_questions`
--
ALTER TABLE `tbl_questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `poll`
--
ALTER TABLE `poll`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `tbl_questions`
--
ALTER TABLE `tbl_questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
