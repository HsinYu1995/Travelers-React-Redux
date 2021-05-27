var express = require("express");
var app = express();
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const jwtAuthz = require("express-jwt-authz");
const { name } = require("ejs");
require("dotenv").config();
const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.jwksUri,
  }),
  audience: process.env.audience,
  issuer: process.env.issuer,
  algorithms: ["RS256"],
});
const checkScopes = jwtAuthz(["read:current_user"]);
app.use(cors());
var publicFile = path.join(__dirname, "static");
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.sendFile(path.join(publicFile, "main.html"));
});
app.use("/static", express.static("static"));

const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.user,
  database: process.env.database,
  password: process.env.password,
  port: 3306,
});
connection.connect(function (err) {
  if (err) {
    console.log("Connect to MySQL failed!");
    throw err;
  } else {
    console.log("Connect to MySQL!");
  }
});
app.get("/salesman/:id", function (req, res) {
  const queryString = "Select route from salesman where id = ?";
  connection.query(queryString, req.params.id, (err, rows) => {
    if (err) {
      console.log("ID is not in the database!");
      res.sendStatus(404);
      res.end();
      return;
    }

    var eachPath = rows[0].route.split(";");

    res.render("index", { path: eachPath });
  });
});
app.get("/route/:name", jwtCheck, checkScopes, (req, res) => {
  const fullName = req.params.name;
  const queryString = "Select route from salesman where name = ?";
  connection.query(queryString, fullName, (err, data) => {
    if (err || data[0] === undefined) {
      console.log("Name is Not in the database!");
      res.sendStatus(404);
      res.end();
      return;
    }
    res.send(data[0].route);
  });
});
var server = app.listen(8081, function () {
  console.log("App is listening on Port 8081!");
});
