const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const app = express();

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extend: true }));
app.use(cors(corsOptions));
var connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "95WilliamBakfickan95",
  database: "mobileapplication",
});
var server = app.listen(3001, function () {
  var host = server.address().adress;
  var port = server.address().port;
});

connection.connect(function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("connected");
  }
});

app.get("/imageuser", function (req, res) {
  connection.query("select * from imageuser", function (error, rows, field) {
    if (error) {
      console.log(error);
    } else {
      console.log(rows);
      res.send(rows);
    }
  });
});
