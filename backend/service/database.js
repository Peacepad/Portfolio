require("dotenv").config();
const mysql = require("mysql");
const { promisify } = require("util");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});




connection.query = promisify(connection.query);

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!")
})

module.exports = connection;
