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

//Enter a room
app.post("/enter", (req, res, next) => {
  var obj = req.body;
  var user = obj.game;
  var options = {};
  //username = game.username;
  //gold = game.gold;
  //health = game.health;
  //inventory = game.inventory;
  //trophies = game.trophies;
  //room = game.room;

  switch(game.room) {
    //Room 1
    case 1:
      options[1] = "Attack the troll";
      options[2] = "Run around the troll";
      if (game.gold >= 20) {
        options[3] = "Bribe the troll";
      }
      if (game.inventory.includes("Flashbang")) {
        options[4] = "Use Flashbang";
      }
      break;
    //Room 2
    case 2:
      options[1] = "Jump over the pit";
      options[2] = "Climb down the pit";
      if(user.inventory.includes("Large Plank")) {
        options[3] = "Use Large Plank";
      }
      break;
    //Room 3
    case 3:
        options[1] = "Open Chest 1";
        options[2] = "Open Chest 2";
        options[3] = "Open Chest 3";
        if(user.inventory.includes("Rope")) {
          options[4] = "Use Rope";
        }
        break;
    //Room 4
    case 4:
        options[1] = "Purchase Rope (10 gold)";
        options[2] = "Purchase Flashbang (15 gold)";
        options[3] = "Purchase MedKit (+15 Health)";
        break;
    //Room 5
    case 5:
        options[1] = "Crack a Joke";
        options[2] = "Walk around the plant";
        if(user.inventory.includes("Chicken Leg")) {
          options[3] = "Throw Chicken Leg";
        }
        break;
    //Room 6
    case 6:
        options[1] = "A Scarecrow";
        options[2] = "A Mountain";
        options[3] = "A Tree";
        break;
    default:
      break;
  }

  var sql = "SELECT * FROM Rooms WHERE roomID = " + user.room;
  con.query(sql, function(err, result) {
    if (err) throw err;
    var data = {result, options};
    res.json(data);
  });
});

//Exit a room
app.post("/exit", (req, res, next) => {
  var obj = req.body;
  var user = obj.user;
  var optionID = obj.optionID;
  var result;
  //gold = user.gold;
  //health = user.health;
  //inventory = user.inventory;
  //trophies = user.trophies;
  //room = user.room;
  
  switch(user.room) {
    //Room 1
    case 1:
      switch(optionID) {
        case 1:
          user.health -= 30;
          result = "As you lunge and attempt to punch the troll in the face, he swiftly dodges and then procedes to call your mom ugly. Your pride is utterly destroyed. You Lose 30 Health.";
          break;
        case 2:
          user.health -= 10;
          result = "You sprint around the troll and avoid his immature insults, but you twist your ankle on a rock. You Lose 10 Health."
          break;
        case 3:
          user.gold -= 20;
          result = "The troll accepts your bribe and lets you pass."
          break;
        case 4:
          user.inventory.splice(user.inventory.indexof("Flashbang"),1);
          result = "You throw the flashbang that stuns and disorients the troll, allowing you to run past."
          break;
        default:
          break;
      }
      break;
    //Room 2
    case 2:
        switch(optionID) {
          case 1:
            user.health -= 10;
            result = "You try to jump over the pit, but fall short of the other side. The pit isn't as deep as you thought, but you hurt your legs falling. You lose 10 health.";
            break;
          case 2:
            result = "The pit isn't as deep as you thought. You climb down and climb back up the other side."
            break;
          case 3:
            user.inventory.splice(user.inventory.indexof("Large Plank"),1);
            result = "You use the large plank to get across but the plank breaks."
            break;
          default:
            break;
        }
        break;
    //Room 3
    case 3:
        switch(optionID) {
          case 1:
            user.gold += 15;
            if(user.gold > 100){
              user.gold = 100;
            }
            result = "You opened Chest 1, you obtained 15 gold.";
            break;
          case 2:
            user.health += 15;
            if(user.health > 100) {
              user.health = 100;
            }
            result = "You opened Chest 2, you obtained bandages and used them. Gain 15 health."
            break;
          case 3:
            user.inventory.push("Can of Beans");
            result = "You opened Chest 3, you obtained a Can of Beans."
            break;
          case 4:
            user.gold += 15;
            if(user.gold > 100){
              user.gold = 100;
            }
            user.health += 15;
            if(user.health > 100) {
              user.health = 100;
            }
            user.inventory.push("Can of Beans");
            user.inventory.splice(user.inventory.indexof("Rope"),1);
            result = "You used the rope to tie all 3 of the chests together and obtained 15 gold, Bandages (15 health), and Item 3."
          default:
            break;
        }
        break;
    //Room 4
    case 4:
        switch(optionID) {
              case 1:
                user.gold -= 10;
                user.inventory.push("Rope");
                result = "You purchased Rope.";
                break;
              case 2:
                user.gold -= 15;
                user.inventory.push("Rope");
                result = "You purchased a Flashbang."
                break;
              case 3:
                user.health +=15;
                result = "You purchased a MedKit. Gain 15 health"
                break;
              default:
                break;
        }
        break;
    //Room 5
    case 5:
        switch(optionID) {
                  case 1:
                    result = "";
                    break;
                  case 2:
                    result = ""
                    break;
                  case 3:
                    user.health -=15;
                    result = "The plant ignores the Chicken Leg and attacks you. You lose 15 health."
                    break;
                  default:
                    break;
        }
        break;
    //Room 6
    case 6:
        switch(optionID) {
                  case 1:
                    user.health -= 10;
                    result = "The woman unleashes a swarm of bats that scratch and scrape you. You lose 10 health.";
                    break;
                  case 2:
                    user.gold -= 10;
                    if(user.gold < 0) {
                      user.gold = 0;
                    }
                    result = "The woman pickpockets you and vanishes. You lose 10 gold"
                    break;
                  case 3:
                    result = "Correct! The mysterious woman lets out an evil laugh and disappears."
                    break;
                  default:
                    break;
        }
        break;
    default:
      break;
  }
  var data = {user, result};
  res.json(data);
});

//Host
app.listen(process.env.PORT || 3000, () => {
 console.log("Server running");
});