const express = require("express");
const path = require("path");
const fs = require("fs");
const app = require("../app");

exports.get = (req, res, next) => {
  res.sendFile(path.join(__dirname + "../../../"));
};
