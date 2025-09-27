// Using mysql2 for better MySQL 8 auth plugin support (caching_sha2_password)
const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "safan",
  database: process.env.DB_NAME || "register",
  multipleStatements: true,
});

module.exports = pool;
