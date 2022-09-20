require("dotenv").config();
const mysql = require("mysql2");
const { promisify } = require("util");

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});




connection.query = promisify(connection.query);



module.exports = connection;


