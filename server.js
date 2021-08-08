const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const PORT = process.env.PORT || 3000;
const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);
