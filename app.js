require("dotenv").config();

const express = require("express");
const app = express();
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const middlewareLog = (req, res, next) => {
  // console.log("incoming request");
  // console.log(`${req.method} ${req.path}`);
  next();
};

app.use(middlewareLog);

app.use(routes);

app.use(errorHandler)

module.exports = app

