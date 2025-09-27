-- Run these commands inside a MySQL client (one by one)
-- Adjust the password before running in production.

CREATE DATABASE IF NOT EXISTS `register`;

-- Create dedicated application user (if it does not already exist)
CREATE USER IF NOT EXISTS 'vusic'@'localhost' IDENTIFIED WITH mysql_native_password BY 'StrongPass123!';

-- Grant privileges only on needed database
GRANT ALL PRIVILEGES ON `register`.* TO 'vusic'@'localhost';
FLUSH PRIVILEGES;

-- Verify plugin (should be mysql_native_password)
SELECT user, host, plugin FROM mysql.user WHERE user='vusic';
