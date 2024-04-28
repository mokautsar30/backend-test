const express = require("express");
const app = express();
const port = 3000;
const routes = require("./routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const middlewareLog = (req, res, next) => {
  console.log("incoming request");
  console.log(`${req.method} ${req.path}`);
  next();
};

app.use(middlewareLog);

app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
