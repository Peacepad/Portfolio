const express = require("express");
require("dotenv").config();
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const projetRoutes = require("./routes/projet");
const pagesRoutes = require("./routes/pages");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static('public'))

app.use("/api/projet", projetRoutes);

module.exports = app;
