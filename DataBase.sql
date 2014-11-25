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
-- Records of sessions
-- ----------------------------
INSERT INTO `sessions` VALUES ('4DwevwPcLEdoSw0z7J3udkMO8Rw9nR-t', '1418901081', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A323037333539393939372C2265787069726573223A22323031342D31322D31385431313A31313A32302E3733305A222C22687474704F6E6C79223A747275652C2270617468223A222F227D2C2269645F75736572223A357D);
INSERT INTO `sessions` VALUES ('B4BXS3e5sTsmGjj043GBrC0H_xq1F-tr', '1418976785', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A323037333630303030302C2265787069726573223A22323031342D31322D31395430383A31333A30352E3233305A222C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('GNthW5dvBmlj2pPVXJXwqIWXfq4RN7qm', '1418976793', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A323037333630303030302C2265787069726573223A22323031342D31322D31395430383A31333A31322E3734305A222C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('KrL_n0c99-dgKcUHz5kEl3wvfxdm5ekZ', '1418975252', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A323037333630303030302C2265787069726573223A22323031342D31322D31395430373A34373A33312E3736335A222C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('LTEBN7O7dJkaiMExwtuG9TwHqOMvnPPp', '1418976955', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A323037333630303030302C2265787069726573223A22323031342D31322D31395430383A31353A35352E3137345A222C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('Lz617-47mjIfePqAjmqfsUZZZU1BA842', '1418945913', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A323037333539393939352C2265787069726573223A22323031342D31322D31385432333A33383A33332E3030355A222C22687474704F6E6C79223A747275652C2270617468223A222F227D2C2269645F75736572223A357D);
INSERT INTO `sessions` VALUES ('YyQV84O8kj1yA2hP4BARQYOo3bxsSARg', '1418976105', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A323037333630303030302C2265787069726573223A22323031342D31322D31395430383A30313A34352E3036365A222C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('f5C-i_HykukobBBiYxhbFiOV5OdEykS7', '1418978597', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A323037333539393939362C2265787069726573223A22323031342D31322D31395430383A34333A31372E3235345A222C22687474704F6E6C79223A747275652C2270617468223A222F227D2C2269645F75736572223A357D);
INSERT INTO `sessions` VALUES ('k9cJn3PAeFJvdKXBnz2RL34dyXWAzz1t', '1418995917', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A323037333539393939392C2265787069726573223A22323031342D31322D31395431333A33313A35362E3934335A222C22687474704F6E6C79223A747275652C2270617468223A222F227D2C2269645F75736572223A357D);
INSERT INTO `sessions` VALUES ('klImE-HVsBMZMt-0hxYwu3jpfBGHVCYV', '1418976840', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A323037333630303030302C2265787069726573223A22323031342D31322D31395430383A31343A30302E3233375A222C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('lJcFqJ6RafQMttV8jiwOtd3GaJRoiL62', '1418970774', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A323037333539393932382C2265787069726573223A22323031342D31322D31395430363A33323A35332E3839385A222C22687474704F6E6C79223A747275652C2270617468223A222F227D2C2269645F75736572223A357D);
INSERT INTO `sessions` VALUES ('mapWIu6h0HRZ6O6ppxbFfJ9JcrJdv4TA', '1418976805', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A323037333630303030302C2265787069726573223A22323031342D31322D31395430383A31333A32352E3032395A222C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('oOFq8i1bl63QVLZhw-HvzeIcd633i8J1', '1418976066', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A323037333630303030302C2265787069726573223A22323031342D31322D31395430383A30313A30352E3933385A222C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('pM_nDITkRhzI1rQw-DaXDS54jbVSsG1k', '1418993225', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A323037333630303030302C2265787069726573223A22323031342D31322D31395431323A34373A30352E3138375A222C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);
INSERT INTO `sessions` VALUES ('qieIyU0dzrGe4t5jb9b0kmG8jpU3LqyN', '1418994065', 0x7B22636F6F6B6965223A7B226F726967696E616C4D6178416765223A323037333630303030302C2265787069726573223A22323031342D31322D31395431333A30313A30352E3137365A222C22687474704F6E6C79223A747275652C2270617468223A222F227D7D);

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
