-- Check current user
SELECT user, host, plugin FROM mysql.user WHERE user='vusic';

-- Drop and recreate user (ensures clean state)
DROP USER IF EXISTS 'vusic'@'localhost';
CREATE USER 'vusic'@'localhost' IDENTIFIED WITH mysql_native_password BY 'StrongPass123!';
GRANT ALL PRIVILEGES ON register.* TO 'vusic'@'localhost';
FLUSH PRIVILEGES;

-- Verify database exists
USE register;
SHOW TABLES;
SELECT COUNT(*) FROM songs;