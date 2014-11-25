/*
Navicat MySQL Data Transfer

Source Server         : Online-calculator
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2014-11-25 16:32:30
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `access`
-- ----------------------------
DROP TABLE IF EXISTS `access`;
CREATE TABLE `access` (
  `id_user` int(11) NOT NULL,
  `id_catalog` int(11) NOT NULL,
  PRIMARY KEY (`id_user`,`id_catalog`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of access
-- ----------------------------
INSERT INTO `access` VALUES ('2', '3');
INSERT INTO `access` VALUES ('5', '19');
INSERT INTO `access` VALUES ('6', '17');
INSERT INTO `access` VALUES ('6', '18');

-- ----------------------------
-- Table structure for `alghoritms`
-- ----------------------------
DROP TABLE IF EXISTS `alghoritms`;
CREATE TABLE `alghoritms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(16) DEFAULT NULL,
  `id_catalog` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of alghoritms
-- ----------------------------
INSERT INTO `alghoritms` VALUES ('6', 'Alg 1', '1');
INSERT INTO `alghoritms` VALUES ('7', 'Alg 3', '2');
INSERT INTO `alghoritms` VALUES ('8', 'SSSSS', '1');
INSERT INTO `alghoritms` VALUES ('9', 'ADASDd', '1');
INSERT INTO `alghoritms` VALUES ('10', '321123', '1');
INSERT INTO `alghoritms` VALUES ('11', 'Result', '6');
INSERT INTO `alghoritms` VALUES ('12', 'Catalog User', '8');
INSERT INTO `alghoritms` VALUES ('13', 'Alg 1', '23');
INSERT INTO `alghoritms` VALUES ('14', 'Alg 2', '23');
INSERT INTO `alghoritms` VALUES ('15', 'Alg 3', '23');
INSERT INTO `alghoritms` VALUES ('17', 'Test', '28');
INSERT INTO `alghoritms` VALUES ('18', 'Алгоритм 1', '17');
INSERT INTO `alghoritms` VALUES ('19', 'For Admin', '19');
INSERT INTO `alghoritms` VALUES ('22', 'Start', '17');

-- ----------------------------
-- Table structure for `catalogs`
-- ----------------------------
DROP TABLE IF EXISTS `catalogs`;
CREATE TABLE `catalogs` (
  `id` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `name` char(16) NOT NULL DEFAULT '',
  `id_pred` int(11) NOT NULL,
  PRIMARY KEY (`id`,`name`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of catalogs
-- ----------------------------
INSERT INTO `catalogs` VALUES ('00000000017', 'Admin', '0');
INSERT INTO `catalogs` VALUES ('00000000018', 'Start', '17');
INSERT INTO `catalogs` VALUES ('00000000019', 'User01', '0');
INSERT INTO `catalogs` VALUES ('00000000020', 'Catalog User 1', '19');
INSERT INTO `catalogs` VALUES ('00000000023', 'User02', '0');
INSERT INTO `catalogs` VALUES ('00000000024', 'Catlog Test', '23');
INSERT INTO `catalogs` VALUES ('00000000026', 'Root', '0');
INSERT INTO `catalogs` VALUES ('00000000027', 'Test Catalogss', '17');
INSERT INTO `catalogs` VALUES ('00000000028', 'Caalog 1', '18');
INSERT INTO `catalogs` VALUES ('00000000029', 'Start', '18');

-- ----------------------------
-- Table structure for `sessions`
-- ----------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `session_id` varchar(255) COLLATE utf8_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text COLLATE utf8_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ----------------------------
-- Table structure for `text_alghoritms`
-- ----------------------------
DROP TABLE IF EXISTS `text_alghoritms`;
CREATE TABLE `text_alghoritms` (
  `id_alghoritm` int(11) DEFAULT NULL,
  `formula` char(100) DEFAULT NULL,
  `list_indetificators` char(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of text_alghoritms
-- ----------------------------
INSERT INTO `text_alghoritms` VALUES ('18', 'x1+(x2+x3)*(x4+x2)-x7 * (x5-x6)', 'x1=-10,x2=5,x3=6,x4=1,x5=3, x6=4,x7=10');
INSERT INTO `text_alghoritms` VALUES ('19', '(x1+x2)/x3', 'x1=13,x2=15,x3=-5');

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` char(16) NOT NULL DEFAULT '',
  `password` char(255) DEFAULT NULL,
  `id_catalog` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`,`login`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('5', 'Admin', '21232f297a57a5a743894a0e4a801fc3', '17');
INSERT INTO `users` VALUES ('6', 'User01', 'b59c67bf196a4758191e42f76670ceba', '19');
INSERT INTO `users` VALUES ('7', 'User02', '934b535800b1cba8f96a5d72f72f1611', '23');
INSERT INTO `users` VALUES ('8', 'Root', 'fa03eb688ad8aa1db593d33dabd89bad', '26');
