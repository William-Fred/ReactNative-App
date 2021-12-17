const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const sharp = require("sharp");

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const app = express();

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extend: true }));
app.use(cors(corsOptions));
app.use(express.static("/.public"));
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

var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./images/"); // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({
  storage: storage,
});

//routes start
app.get("/", (req, res) => {
  res.sendFile(req + "/index.html");
});
//@type   POST
//route for post data
app.post("/image", upload.single("image"), (req, res) => {
  if (!req.file) {
    console.log("No file upload");
  } else {
    console.log(req.file.filename);
    var imgsrc = req.file.filename;
    var insertData = "INSERT INTO image(imageFile)VALUES(?)";
    connection.query(insertData, [imgsrc], (err, result) => {
      if (err) throw err;
      console.log("file uploaded");
    });
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
// app.post("/image", function (req, res) {
//   var imgsrc = "http://192.168.0.4:3001/images/" + req.file.filename;
//   var insertData = "INSERT INTO image(imageFile)VALUES(?)";
//   connection.query(insertData, [imgsrc], (err, result) => {
//     if (err) throw err;
//     console.log("file uploaded");
//   });
// });
