DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price DECIMAL(5,2),
    stock_quantity INT(10),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES("Mr.Rogers Mug","Dishes",15.00,10),
("iPad","Electronics",350.50,5),("Plush Blanket","Bedding",9.99,5),("KitchenAid Mixer","Kitchen",425.00,3),
("Organic Self-Tanner","Beauty",15.99,25),
("Rubber Spatulas 3-pack","Kitchen",10.99,10),
("Zune 150 GB","Electronics",100.00,1),
("American Flag","Outdoors",13.99,100),
("Dunder Mifflin T-Shirt","Clothing",7.99,25),
("Red Headband","Beauty",3.00,14);

SELECT * 
FROM products;

