var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');
var cryptJS = require('crypto-js');
var cors = require('cors');

app.use(cors());
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
    var username = obj.username;
    var passwordTemp = obj.password;
    var email = obj.email;
    var sql;

    //Encrypt email and password
    var password = cryptJS.SHA256(passwordTemp);

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
  var username = obj.username;
  var passwordTemp = obj.password;
  var sql;
  //Decrypt password
  var password = cryptJS.SHA256(passwordTemp);

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

//Recover password (In progress)
app.post("/recovery", (req, res, next) => {
  var obj = req.body;
  var email = obj.email;

  //Decrypt email

  var sql = "SELECT password FROM User WHERE email = '" + email + "'";
  con.query(sql, function(err, result) {
    if (err) throw err;
    if (result.length > 0) {
      res.json(result);
    }else {
      res.json("Failure");
    }
  });
});

//Giving high score info on entire leaderboard
app.get("/score", (req, res, next) => {
  var sql = "SELECT * FROM Scores ORDER BY score DESC";
  con.query(sql, function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});


//Giving high score info on specific user
app.post("/score", (req, res, next) => {
  var obj = req.body;
  var username = obj.username;
  var sql = "SELECT * FROM Scores WHERE username = '" + username + "'ORDER BY score DESC";
  con.query(sql, function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

//Change password
app.post("/changepassword", (req, res, next) => {
  var obj = req.body;
  var username = obj.username;
  var passwordTemp = obj.password;
  var newPasswordTemp = obj.newPassword;

  //Encrypt email and password
  var password = cryptJS.SHA256(passwordTemp);
  var newPassword = cryptJS.SHA256(newPasswordTemp);

  var sql = "SELECT password FROM User WHERE username = '" + username + "'";
  con.query(sql, function(err, result) {
    if (err) throw err;
    if (result.length > 0) {
      var check = result[0].password;
      if (check == password) {
        sql = "UPDATE User SET password = '" + newPassword + "' WHERE username = '" + username + "'";
        con.query(sql, function(err, result) {
          if (err) throw err;
          res.json("Success");
        });
      }else {
        res.json("Password is incorrect.");
      }
    }else {
      res.json("Username does not exist.");
    }
  });
});

//Change username
app.post("/changeusername", (req, res, next) => {
  var obj = req.body;
  var username = obj.username;
  var passwordTemp = obj.password;
  var newUsername = obj.newUsername;

  //Encrypt password
  var password = cryptJS.SHA256(passwordTemp);

  var sql = "SELECT password FROM User WHERE username = '" + username + "'";
  con.query(sql, function(err, result) {
    if (err) throw err;
    if (result.length > 0) {
      var check = result[0].password;
      if (check == password) {
        sql = "SELECT * FROM User WHERE username = '" + newUsername + "'";
        con.query(sql, function(err, result) {
          if (err) throw err;
          if(result.length > 0) {
            res.json("Username already exists");
          }else {
            sql = "UPDATE User SET username = '" + newUsername + "' WHERE username = '" + username + "'";
            con.query(sql, function(err, result) {
              if (err) throw err;
              sql = "UPDATE UserTrophies SET username = '" + newUsername + "' WHERE username = '" + username + "'";
              con.query(sql, function(err, result) {
                if (err) throw err;
                sql = "UPDATE Scores SET username = '" + newUsername + "' WHERE username = '" + username + "'";
                con.query(sql, function(err, result) {
                  if (err) throw err;
                });
              });
              res.json("Success");
            });
          }
        });
      }else {
        res.json("Password is incorrect.");
      }
    }else {
      res.json("Username does not exist.");
    }
  });
});

//Get list of trophies earned
app.post("/trophies", (req, res, next) => {
  var obj = req.body;
  var username = obj.username;
  var sql = "SELECT trophy FROM UserTrophies WHERE username = '" + username + "' ORDER BY trophy ASC";
  con.query(sql, function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

//Add trophy earned
app.post("/addtrophytest", (req, res, next) => {
  var obj = req.body;
  var username = obj.username;
  var trophyID = obj.trophyID;
  var sql = "INSERT INTO UserTrophies (trophy, username) VALUES (" + trophyID + ", '" + username  + "')";
  con.query(sql, function(err, result) {
    if (err) throw err;
    res.json("Success");
  });
});

//Delete test entries
app.post("/deletetest", (req, res, next) => {
  var obj = req.body;
  var username = obj.username;
  var sql = "DELETE FROM User WHERE username = '" + username + "'";
  con.query(sql, function(err, result) {
    if (err) throw err;
    sql = "DELETE FROM UserTrophies WHERE username = '" + username + "'";
    con.query(sql, function(err, result) {
      if (err) throw err;
      sql = "DELETE FROM Scores WHERE username = '" + username + "'";
      con.query(sql, function(err, result) {
        if (err) throw err;
        res.json("Success");
      });
    });
  });
});

app.post("/addscoretest", (req, res, next) => {
  var obj = req.body;
  var username = obj.username;
  var score = obj.score;
  var sql = "INSERT INTO Scores (username, score) VALUES ('" + username + "', " + score + ")";
  con.query(sql, function(err, result) {
    if (err) throw err;
    res.json("Success");
  });
});

//Host
app.listen(process.env.PORT || 3000, () => {
 console.log("Server running");
});