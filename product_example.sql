CREATE DATABASE assignment1;
use assignment1;

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `product_id` int(10) unsigned DEFAULT NULL,
  `product_name` varchar(20) DEFAULT NULL,
  `unit_price` float(8,2) DEFAULT NULL,
  `unit_quantity` varchar(15) DEFAULT NULL,
  `category` varchar(20) DEFAULT NULL,
  `sub_category` varchar(20) DEFAULT NULL,
  `in_stock` int(10) unsigned DEFAULT NULL,
  `image_directory` varchar(20) DEFAULT NULL 
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of products
-- ----------------------------
BEGIN;
INSERT INTO `products` VALUES (1000, 'Fish Fingers', 2.2, '400 gram','Frozen', 'Party Foods', 10, 'image/1000.jpg');
INSERT INTO `products` VALUES (1001, 'Fish Fingers', 5.00, '1000 gram','Frozen', 'Party Foods', 750, 'image/1001.jpg');
INSERT INTO `products` VALUES (1002, 'Hamburger Patties', 2.35, 'Pack 10','Meat', 'Burgers', 1200, 'image/1002.jpg');
INSERT INTO `products` VALUES (1003, 'Raw Prawns', 6.90, '250 gram','Seafoods', 'Prawns', 300, 'image/1003.jpg');
INSERT INTO `products` VALUES (1004, 'Tub Ice Cream', 1.80, 'I Litre', 'Frozen', 'Ice creams', 800, 'image/1004.jpg');
INSERT INTO `products` VALUES (1005, 'Tub Ice Cream', 3.40, '2 Litre', 'Frozen', 'Ice creams', 1200, 'image/1005.jpg');
INSERT INTO `products` VALUES (2000, 'Panadol', 3.00, 'Pack 20','Health & Beauty', 'Medicines',  2000, 'image/2000.jpg');
INSERT INTO `products` VALUES (2001, 'Panadol Children', 5.50, 'Pack 16','Health & Beauty', 'Medicines', 1000, 'image/2001.jpg');
INSERT INTO `products` VALUES (2002, 'Bath Soap', 2.60, 'Pack 8', 'Health & Beauty', 'Shower', 500, 'image/2002.jpg');
INSERT INTO `products` VALUES (2003, 'Garbage Bags Small', 1.50, 'Pack 40', 'Household', 'Kitchen', 500, 'image/2003.jpg');
INSERT INTO `products` VALUES (2004, 'Garbage Bags Large', 5.00, 'Pack 20', 'Household', 'Kitchen', 300, 'image/2004.jpg');
INSERT INTO `products` VALUES (2005, 'Washing Powder', 4.00, '1000 gram','Household', 'Laundry', 800, 'image/2005.jpg');
INSERT INTO `products` VALUES (3000, 'Cheddar Cheese', 8.00, '500 gram', 'Dairy & Pantry', 'Cheese', 1000, 'image/3000.jpg');
INSERT INTO `products` VALUES (3001, 'Tasty Cheese', 15.00, '1000 gram', 'Dairy & Pantry', 'Cheese', 1000, 'image/3001.jpg');
INSERT INTO `products` VALUES (3002, 'T Bone Steak', 7.00, '1000 gram','Meat', 'Beef', 200, 'image/3002.jpg');
INSERT INTO `products` VALUES (3003, 'Navel Oranges', 3.99, 'Bag 20', 'Fruit & Vegetables', 'Fruit', 200, 'image/3003.jpg');
INSERT INTO `products` VALUES (3004, 'Bananas', 1.49, 'Kilo', 'Fruit & Vegetables', 'Fruit',400, 'image/3004.jpg');
INSERT INTO `products` VALUES (3005, 'Peaches', 2.99, 'Kilo', 'Fruit & Vegetables', 'Fruit',500, 'image/3005.jpg');
INSERT INTO `products` VALUES (3006, 'Grapes', 3.50, 'Kilo', 'Fruit & Vegetables', 'Fruit',200, 'image/3006.jpg');
INSERT INTO `products` VALUES (3007, 'Apples', 1.99, 'Kilo', 'Fruit & Vegetables', 'Fruit',500, 'image/3007.jpg');
INSERT INTO `products` VALUES (4000, 'Earl Grey Tea Bags', 2.49, 'Pack 10', 'Dairy & Pantry', 'Tea', 1200, 'image/4000.jpg');
INSERT INTO `products` VALUES (4001, 'Earl Grey Tea Bags', 7.25, 'Pack 100', 'Dairy & Pantry', 'Tea', 1200, 'image/4001.jpg');
INSERT INTO `products` VALUES (4002, 'Earl Grey Tea Bags', 5.00, 'Pack 50', 'Dairy & Pantry', 'Tea', 800, 'image/4002.jpg');
INSERT INTO `products` VALUES (4003, 'Instant Coffee', 2.89, '200 gram', 'Dairy & Pantry', 'Coffee', 500, 'image/4003.jpg');
INSERT INTO `products` VALUES (4004, 'Instant Coffee', 5.10, '500 gram', 'Dairy & Pantry', 'Coffee', 500, 'image/4004.jpg');
INSERT INTO `products` VALUES (4005, 'Chocolate Bar', 2.50, '500 gram', 'Dairy & Pantry', 'Confectionery', 300, 'image/4005.jpg');
INSERT INTO `products` VALUES (5000, 'Dry Dog Food', 5.95, '5 kg Pack', 'Pet', 'Dog', 400, 'image/5000.jpg');
INSERT INTO `products` VALUES (5001, 'Dry Dog Food', 1.95, '1 kg Pack', 'Pet', 'Dog', 400, 'image/5001.jpg');
INSERT INTO `products` VALUES (5002, 'Bird Food', 3.99, '500g packet', 'Pet', 'Bird', 200, 'image/5002.jpg');
INSERT INTO `products` VALUES (5003, 'Cat Food', 2.00, '400g tin', 'Pet', 'Cat', 200, 'image/5003.jpg');
INSERT INTO `products` VALUES (5004, 'Fish Food', 3.00, '500g packet', 'Pet', 'Fish', 200, 'image/5004.jpg');
INSERT INTO `products` VALUES (2006, 'Laundry Bleach', 3.55, '2 Litre Bottle', 'Household', 'Laundry', 500, 'image/2006.jpg');
COMMIT;
