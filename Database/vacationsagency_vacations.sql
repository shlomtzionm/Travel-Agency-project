CREATE DATABASE  IF NOT EXISTS `vacationsagency` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vacationsagency`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: vacationsagency
-- ------------------------------------------------------
-- Server version	9.0.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `location` varchar(255) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` int NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (28,'Bali, Indonesia','Experience the serene beaches and lush landscapes of Bali.','2025-11-20','2025-12-04',1200,'9d5052f8-41e5-4d58-a6b0-b9a2d5dd4c18.jpg'),(29,'Paris, France','Explore the city of love with its iconic landmarks.','2025-02-06','2025-05-06',1500,'a9ab144d-edfd-43a2-b943-d061352d51bb.jpg'),(30,'Tokyo, Japan','Discover the blend of tradition and modernity in Tokyo.','2024-11-16','2024-11-30',2000,'0f23d729-2b6c-4d83-8ad7-544c44c91144.jpg'),(31,'Sydney, Australia','Enjoy the beautiful beaches and vibrant culture of Sydney','2024-10-31','2024-11-14',1400,'6f6f198a-3363-4a4b-aa0a-cc2cfe631b72.jpg'),(32,'New York, USA','Experience the hustle and bustle of the Big Apple.','2025-01-03','2025-01-31',2200,'61c5e19d-a66e-42e9-b8c6-0398b2f43d10.jpg'),(33,'Cape Town, South Africa','Cape Town, South Africa','2024-11-01','2025-01-01',3000,'d4273726-bb40-4dad-a645-7155b9f4d83e.jpg'),(34,'Rome, Italy','Dive into the ancient history and art of Rome','2024-10-03','2024-10-24',1300,'49239d85-c0b2-430c-ad20-20803dbac330.jpg'),(35,'Rio de Janeiro, Brazil','Celebrate the vibrant culture and beautiful beaches of Rio.','2024-10-30','2024-11-07',1450,'e75e46be-6e89-4629-831d-c9f0fb562abf.jpg'),(36,'Santorini, Greece','Relax in the picturesque views of Santorini\'s sunsets.','2024-10-15','2024-10-16',2100,'a55afec2-5ba9-4b23-8906-bf8b9e4ccbaf.jpg'),(37,'Maui, Hawaii','Unwind on the stunning beaches of Maui.','2024-10-01','2024-10-11',1730,'05185dd8-c395-4f26-84e4-90d7dd2ee61b.jpg'),(38,'London, UK','Discover the rich history and modern attractions of London.','2024-12-26','2025-01-10',1600,'cd50179f-a64d-44cc-b03c-2761190c33b4.jpg'),(39,'Queenstown, New Zealand','Adventure awaits in the breathtaking landscapes of Queenstown','2024-10-19','2024-11-01',2900,'b6a907c7-fbf3-4b50-9573-e4a7248663cd.jpg');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `add_new_vacation_to_favorites` AFTER INSERT ON `vacations` FOR EACH ROW BEGIN
    INSERT INTO favorites (userId, vacationId, isFavorite)
    SELECT u.id, NEW.id, 0
    FROM users u;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-30 17:16:41
