const mysql = require("mysql2/promise");

const config = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "sua_senha",
  database: process.env.DB_NAME || "cinema_db",
};

const pool = mysql.createPool(config);

module.exports = pool;
