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

//Host
app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
 });

//Handling creating new account
app.post("/newuser", (req, res, next) => {
    var obj = req.body;
    var username = obj.user.username;
    console.log(username);
    var password = obj.user.password;
    console.log(password);
    var email = obj.user.email;
    console.log(email);
    var sql;

    //Encrypt email and password
    
    //Check to see if email already exists
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
            sql = "INSERT INTO User (email, username, password) VALUES ('" + email + "', '" + username  + "', '" + password + "')";
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
  var sql;
  //Decrypt password

  //Do check for email/username and password
  sql = "SELECT * FROM User WHERE (username = '" + username + "') AND (password = '" + password + "')";
  con.query(sql, function(err, result) {
    if (err) throw err;
    if (result.length > 0) {
      res.json("Success");
    }else {
      res.json("Failure");
    }
  });
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