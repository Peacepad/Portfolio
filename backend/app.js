const express = require("express");
require("dotenv").config();
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const projetRoutes = require("./routes/projet");
const contactRoutes = require("./routes/contact");
const userRoutes = require('./routes/user');
const noteRoutes = requires('./routes/note');

const app = express();

app.use(cors(
    {
        origin: '*'
    }
));

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static('frontend'));

app.use('/projets', express.static("./frontend/projets"));
app.use('/images', express.static("./frontend/public/images"));
app.use('/divers', express.static("./frontend/divers"))

app.use("/api/projet", projetRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/user", userRoutes);
app.use("/api/note", noteRoutes);

module.exports = app;