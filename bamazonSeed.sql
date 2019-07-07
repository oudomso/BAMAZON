CREATE database bamazon;

DROP DATABASE IF EXISTS bamazon;

USE bamazon;

CREATE TABLE products(
	id INT AUTO_INCREMENT NOT NULL,
	product VARCHAR(100) NOT NULL,
	department VARCHAR(100) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock INT(20) NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO products (product, department, price, stock) 
VALUES ("Iphone X (64GB)", "Electronic", 1099.99, 100),
	   ("Iphone X (128 GB)", "Electronic", 1199.99, 60),
	   ("Iphone X (256 GB)", "Electronic", 1299.99, 71),
	   ("Iphone XR (64GB)", "Electronic", 1099.99, 100),
	   ("Iphone XR (128 GB)", "Electronic", 1199.99, 60),
	   ("Iphone XR (256 GB)", "Electronic", 1299.99, 71),
	   ("Airpods (Wireless Charging)", "Electronic", 179.99, 100),
       ("Airpods", "Electronic", 119.99, 100),
       ("Samsung Dish Washer", "Appliance", 699.99, 12),
       ("Razer Black Widow Chroma", "Gaming", 129.99, 27),
       