const express = require("express");
require("dotenv").config();
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const projetRoutes = require("./routes/projet");
const contactRoutes = require("./routes/contact");

const app = express();

app.use(cors(
    {
        origin: '*'
    }
));

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static('public'))

app.use("/api/projet", projetRoutes);
app.use("/api/contact", contactRoutes);

module.exports = app;
