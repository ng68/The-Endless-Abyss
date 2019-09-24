var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');

app.use(bodyParser.json());

var con = mysql.createConnection({
  host: 'remotemysql.com',
  user: 'oBIw78M3tx',
  password: 'IgLMVTpxnE',
  port: '3306'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
});

app.post("/url", (req, res, next) => {
    var obj = req.body;
    console.log(obj.Hello);
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});

app.get("/url", (req, res, next) => {
    res.json(["Cool", "World"]);
});

app.listen(process.env.PORT, () => {
 console.log("Server running");
});