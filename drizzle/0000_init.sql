CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`price` int NOT NULL,
	`description` text NOT NULL,
	`image` text NOT NULL,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
