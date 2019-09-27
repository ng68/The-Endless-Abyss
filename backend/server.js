var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');

app.use(bodyParser.json());

var con = mysql.createConnection({
  host: 'remotemysql.com',
  user: 'oBIw78M3tx',
  password: 'IgLMVTpxnE',
  port: '3306',
  database: 'oBIw78M3tx'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
});

//Handling creating new account
app.post("/newuser", (req, res, next) => {
    var obj = req.body;
    var username = obj.user.username;
    var password = obj.user.password;
    var email = obj.user.email;
    var sql;
    
    //Check to see if email alrady exists
    sql = "SELECT * FROM User WHERE email = '" + email + "'";
    con.query(sql, function(err, result) {
      if (err) throw err;
      if (result.length > 0) {
        res.json("Failure Email");
      }else {
        //Check to see if username already exists
        sql = "SELECT * FROM User WHERE username = '" + username + "'";
        con.query(sql, function(err, result2) {
          if (err) throw err;
          if (result2.length > 0) {
            res.json("Failure Username");
          }else {
            sql = "INSERT INTO User (email, username, password) VALUES ('" + username + "', '" + password  + "', '" + email + "')";
            con.query(sql, function(err, result3) {
                if (err) throw err;
                console.log("1 record inserted!");
                res.json("Success");
            });
          }
        });
      }
    });
});

//Handling login
app.post("/login", (req, res, next) => {
  var obj = req.body;
  var username = obj.user.username;
  var password = obj.user.password;
  //Do check for email/username and password
  res.json([username, password]);
});

//Recover password
app.post("/recovery", (req, res, next) => {
  
});

//Giving high score info on entire leaderboard
app.get("/score", (req, res, next) => {
  
});

//Giving high score info on specific user
app.post("/score", (req, res, next) => {
  
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