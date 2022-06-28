const express = require("express");
require("dotenv").config();
const path = require("path");
const cors = require("cors");
const projetRoutes = require("./routes/projet");

const app = express();

app.use(
  cors()
);

app.use(express.json());
app.use(express.urlencoded());

app.use("/images", express.static(path.join(__dirname, "/images")));

app.use("/api/projet", projetRoutes);

module.exports = app;
