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

//Handling login
app.post("/login", (req, res, next) => {
    var obj = req.body;
    var username = obj.username;
    var password = obj.password;
    //Check if credentials are correct
});

//Handling creating new account
app.post("/newuser", (req, res, next) => {
  var obj = req.body;
  var username = obj.username;
  var password = obj.password;
  var email = obj.email;
  //Do check for email/username already existing and return error message

  //Else encrypt password and store in database and return success message
  res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});

//Giving high score info on entire leaderboard
app.get("/score", (req, res, next) => {
  
});

//Giving high score info on specific user
app.post("/score", (req, res, next) => {
  
});

//Change email
app.post("/changeemail", (req, res, next) => {
  
});

//Change password
app.post("/changepassword", (req, res, next) => {
  
});

//Change username
app.post("/changeusername", (req, res, next) => {
  
});

//Get list of trophies earned
app.get("/trophies", (req, res, next) => {
  
});


//Host
app.listen(process.env.PORT || 3000, () => {
 console.log("Server running");
});