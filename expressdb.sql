/*
 Navicat Premium Data Transfer

 Source Server         : 127.0.0.1
 Source Server Type    : MySQL
 Source Server Version : 50646
 Source Host           : localhost:3306
 Source Schema         : expressdb

 Target Server Type    : MySQL
 Target Server Version : 50646
 File Encoding         : 65001

 Date: 23/02/2021 17:10:00
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for dept_and_job
-- ----------------------------
DROP TABLE IF EXISTS `dept_and_job`;
CREATE TABLE `dept_and_job`  (
  `job_id` int(10) NULL DEFAULT NULL,
  `dept_id` int(10) NULL DEFAULT NULL,
  INDEX `job_id`(`job_id`) USING BTREE,
  INDEX `dept_id`(`dept_id`) USING BTREE,
  CONSTRAINT `dept_and_job_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`job_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `dept_and_job_ibfk_2` FOREIGN KEY (`dept_id`) REFERENCES `depts` (`dept_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for depts
-- ----------------------------
DROP TABLE IF EXISTS `depts`;
CREATE TABLE `depts`  (
  `dept_id` int(11) NOT NULL AUTO_INCREMENT,
  `dept_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `deleted` int(10) NOT NULL COMMENT '0 未删除 ， 1删除',
  PRIMARY KEY (`dept_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of depts
-- ----------------------------
INSERT INTO `depts` VALUES (1, '研发组', 0);
INSERT INTO `depts` VALUES (2, '人事管理部', 0);
INSERT INTO `depts` VALUES (3, '综合部', 0);

-- ----------------------------
-- Table structure for jobs
-- ----------------------------
DROP TABLE IF EXISTS `jobs`;
CREATE TABLE `jobs`  (
  `job_id` int(11) NOT NULL AUTO_INCREMENT,
  `job_name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `deleted` int(1) NOT NULL COMMENT '0 未删除 1已删除',
  PRIMARY KEY (`job_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of jobs
-- ----------------------------
INSERT INTO `jobs` VALUES (1, 'web大前端', 0);
INSERT INTO `jobs` VALUES (2, 'php后端开发', 0);

-- ----------------------------
-- Table structure for personnels
-- ----------------------------
DROP TABLE IF EXISTS `personnels`;
CREATE TABLE `personnels`  (
  `personnel_id` int(11) NOT NULL AUTO_INCREMENT,
  `personnel_name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  `job_id` int(11) NULL DEFAULT NULL,
  `sex` int(16) NOT NULL COMMENT '0 男  1女',
  `deleted` int(11) NOT NULL COMMENT '0 未删除  1 删除',
  `dept_id` int(10) NULL DEFAULT NULL,
  PRIMARY KEY (`personnel_id`) USING BTREE,
  INDEX `job_id`(`job_id`) USING BTREE,
  INDEX `dept_id`(`dept_id`) USING BTREE,
  CONSTRAINT `personnels_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`job_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `personnels_ibfk_2` FOREIGN KEY (`dept_id`) REFERENCES `depts` (`dept_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of personnels
-- ----------------------------
INSERT INTO `personnels` VALUES (1, '张三', '2021-02-20 14:58:24', 1, 0, 0, 1);
INSERT INTO `personnels` VALUES (2, '李四', '2021-02-22 09:09:41', 1, 0, 0, 2);
INSERT INTO `personnels` VALUES (3, '王五', '2021-02-22 09:09:58', 1, 0, 0, 3);
INSERT INTO `personnels` VALUES (4, '赵六', '2021-02-22 09:10:10', 1, 0, 0, 1);
INSERT INTO `personnels` VALUES (5, '诸葛孔明', '2021-02-22 09:10:25', 1, 0, 0, 2);
INSERT INTO `personnels` VALUES (6, '上官翠花', '2021-02-22 09:10:42', 1, 1, 0, 1);
INSERT INTO `personnels` VALUES (7, '李狗蛋', '2021-02-22 16:33:24', 2, 0, 0, 3);
INSERT INTO `personnels` VALUES (8, '孙悟空', '2021-02-22 16:33:07', 2, 0, 0, 1);
INSERT INTO `personnels` VALUES (9, '猪八戒', '2021-02-22 16:33:48', 2, 0, 0, 2);
INSERT INTO `personnels` VALUES (10, '黄月英', '2021-02-22 16:52:58', 2, 1, 0, 1);

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`role_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES (1, 'admin');
INSERT INTO `roles` VALUES (2, 'user');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `pwd` varchar(64) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `role_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `role_id`(`role_id`) USING BTREE,
  CONSTRAINT `role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'admin', '21232f297a57a5a743894a0e4a801fc3', 1);
INSERT INTO `users` VALUES (4, 'users', 'e10adc3949ba59abbe56e057f20f883e', 1);

SET FOREIGN_KEY_CHECKS = 1;
