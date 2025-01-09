-- Create database
CREATE DATABASE IF NOT EXISTS bite_restaurant;
USE bite_restaurant;

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    number_of_people INT NOT NULL,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
    subscription_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verified BOOLEAN DEFAULT FALSE
);

-- Sample data for customers
INSERT INTO customers (name, phone, email) VALUES
('John Doe', '+27730203572', 'john.doe@example.com'),
('Jane Smith', '+27739876543', 'jane.smith@example.com');

-- Sample data for bookings
INSERT INTO bookings (customer_id, reservation_date, reservation_time, number_of_people, message) VALUES
(1, '2024-11-03', '19:00:00', 4, 'Birthday celebration'),
(2, '2024-11-04', '20:00:00', 2, 'Anniversary dinner');

-- Sample data for subscriptions
INSERT INTO subscriptions (email, subscribed_at, verified) VALUES
('subscriber1@example.com', NOW(), FALSE),
('subscriber2@example.com', NOW(), FALSE);