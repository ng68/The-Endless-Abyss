var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');
var cryptJS = require('crypto-js');
var cors = require('cors');
var nodemailer = require('nodemailer');

app.use(cors());
app.use(bodyParser.json());

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'theendlessabyss.noreply@gmail.com',
    pass: '@byss123'
  }
});  

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

//Recover password
app.post("/recovery", (req, res, next) => {
  var obj = req.body;
  var email = obj.email;

  var tempPassword = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < 10; i++ ) {
    tempPassword += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  //Save temp password
  var encryptPassword = cryptJS.SHA256(tempPassword);
  sql = "UPDATE User SET password = '" + encryptPassword + "' WHERE email = '" + email + "'";
  con.query(sql, function(err, result) {
    if (err) throw err;
  });

  var mailOptions = {
    from: 'theendlessabyss.noreply@gmail.com',
    to: email,
    subject: 'Recovery password for The Endless Abyss',
    text: 'Here is your temporary password: ' + tempPassword
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.json(email);
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
                sql = "UPDATE UserGameInventory SET username = '" + newUsername + "' WHERE username = '" + username + "'";
                con.query(sql, function(err, result) {});
                sql = "UPDATE UserGames SET username = '" + newUsername + "' WHERE username = '" + username + "'";
                con.query(sql, function(err, result) {});
                sql = "UPDATE UserGameTrophies SET username = '" + newUsername + "' WHERE username = '" + username + "'";
                con.query(sql, function(err, result) {});
                sql = "UPDATE UserGameRecentRooms SET username = '" + newUsername + "' WHERE username = '" + username + "'";
                con.query(sql, function(err, result) {});
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

//Enter a roomID
app.post("/enter", (req, res, next) => {
  var obj = req.body;
  var game = obj.game;
  var options = {};
  //username = game.username;
  //gold = game.gold;
  //health = game.health;
  //inventory = game.inventory;
  //trophies = game.trophies;
  //roomID = game.roomID;

  switch(game.roomID) {
    //Room 1 Cave of the Troll
    case 1:
      options[1] = "Attack the troll.";
      options[2] = "Run around the troll.";
      if (game.gold >= 20) {
        options[3] = "Bribe the troll. (-20 Gold)";
      }
      if (game.inventory.includes("Flashbang")) {
        options[4] = "Use the Flashbang.";
      }
      break;
    //Room 2 The Pit
    case 2:
      options[1] = "Jump over the pit.";
      options[2] = "Climb down into the pit.";
      if(game.inventory.includes("Large Plank")) {
        options[3] = "Use Large Plank to go over the pit.";
      }
      break;
    //Room 3 Storage Room
    case 3:
        options[1] = "Open the first chest.";
        options[2] = "Open the second chest.";
        options[3] = "Open the third chest.";
        if(game.inventory.includes("Rope")) {
          options[4] = "Use Rope to tie the chests together.";
        }
        break;
    //Room 4 Hallway Merchant
    case 4:
        if(game.gold >= 10){
          options[1] = "Purchase Rope. (10 gold)";
        }
        if(game.gold >= 15){options[2] = "Purchase Flashbang. (15 gold)";}
        if(game.gold >= 15){options[3] = "Purchase MedKit. (15 gold)";}
        options[4] = "look into your rather empty pockets and sigh."
        break;
    //Room 5 The Greenhouse
    case 5:
        if(game.inventory.includes("Fun Puns")) {
          options[1] = "Read aloud a funny pun from Fun Puns";
        }
        options[2] = "Walk around the plant";
        if(game.inventory.includes("Chicken Leg")) {
          options[3] = "Throw a Chicken Leg";
        }
        options[4] = "Throw a rock at the plant"
        break;
    //Room 6 The Mysterious Woman
    case 6:
        options[1] = "A Scarecrow";
        options[2] = "A Mountain";
        options[3] = "A Tree";
        if (game.inventory.includes("Fun Puns")) {
          options[4] = "Offer \"Fun Puns\" to the woman";
        }
        break;
    //Room 7 The Snow Caverns
    case 7:
        options[1] = "Inspect the fissures";
        options[2] = "Trudge through the ice and snow (-20 Health)";
        if(game.inventory.includes("Torch")) {
          options[3] = "Light the torch and continue"
        }
        break;
    //Room 8 The Dining Chamber
    case 8:
        options[1] = "Try the cuisine.";
        options[2] = "Try the drinks.";
        options[3] = "Survey the cutlery.";
        if(game.inventory.includes("Chicken Leg")){
          options[4] = "Leave an offering for the long lost feast (- Chicken Leg)"
        }
        break;
    //Room 9 The Well
    case 9:
        options[1] = "Get some water";//give 10 hp
        if(game.gold >= 1){
          options[2] = "Toss a coin in (- 1 coin)"// gives sword
        }
        if(game.inventory.includes("Rope")){
          options[3] = "Travel down the well" // Meet keven, gives card, trophie meet keven
        }
        break;
    //Room 10 The Library
    case 10:
        options[1] = "Attempt to sneak past the goblin without disturbing him.";
        options[2] = "Ask the goblin what he is reading.";
        if (game.inventory.includes("Sword")){
          options[3] = "Attack him, sword in hand.";
        }
        if (game.inventory.includes("Flashbang")){
          options[4] = "Throw the flashbang."
        }
        break;
    //Room 11
    case 11:
        options[1] = "";
        options[2] = "";
        break;
    //Room 12
    case 12:
        options[1] = "";
        options[2] = "";
        break;
    //Room 13
    case 13:
        options[1] = "";
        options[2] = "";
        break;
    //Room 14
    case 14:
        options[1] = "";
        options[2] = "";
        break;
    //Room 15
    case 15:
        options[1] = "Move on.";
        if (game.inventory.includes("Torch")){
          options[2] = "Light your torch.";
        }
        if (game.inventory.includes("Sword")){
          options[3] = "Swing your sword at the wall to try and break through it!";
        }
        if (game.inventory.includes("Rope") && game.inventory.includes("Chicken Leg") && game.inventory.includes("Flashbang")){
          options[4] = "Use AAALLLLL the items.";
        }
        break;
    default:
      break;
  }
  var sql = "UPDATE UserGames SET roomID = " + game.roomID + " WHERE username = '" + game.username + "'";
  con.query(sql, function(err, result) {
    if (err) {
      throw err;
    }
    if (result.affectedRows == 0) {
      sql = "INSERT INTO UserGames (username, health, gold, roomID) VALUES ('" + game.username + "', " + game.health  + ", " + game.gold + ", " + game.roomID + ")";
      con.query(sql, function(err, result) { 
        if (err) throw err;
      });
    }
  });
  sql = "DELETE FROM UserGameRecentRooms WHERE username = '" + game.username + "'";
  con.query(sql, function(err, result) { 
  });
  for(var i = 0; i < game.recentRooms.length; i++) {
    sql = "INSERT INTO UserGameRecentRooms (username, roomID) VALUES ('" + game.username + "', '" + game.recentRooms[i]  + "')";
    con.query(sql, function(err, result) {
      if (err) throw err;
    });
  } 
  sql = "SELECT * FROM Rooms WHERE roomID = " + game.roomID;
  con.query(sql, function(err, result) {
    if (err) throw err;
    var data = {options, result};
    res.json(data);
  });
});

//Exit a room
app.post("/exit", (req, res, next) => {
  var obj = req.body;
  var game = obj.game;
  var optionID = parseInt(obj.optionID);
  var result;
  var status = "Playing";
  //gold = game.gold;
  //health = game.health;
  //inventory = game.inventory;
  //trophies = game.trophies;
  //roomID = game.roomID;

  switch(game.roomID) {
    //Room 1
    case 1:
      switch(optionID) {
        case 1:
          game.health -= 30;
          result = "As you lunge and attempt to punch the troll in the face, he swiftly dodges and then proceeds to call your mom ugly. Your pride is utterly destroyed. (-30 Health)";
          break;
        case 2:
          game.health -= 10;
          result = "You sprint around the troll and avoid his immature insults, but you twist your ankle on a rock. (-10 Health)"
          break;
        case 3:
          game.gold -= 20;
          result = "The troll accepts your bribe and proceeds to go on his laptop to buy bathwater. While he's distracted you walk past him. (-20 Gold)"
          break;
        case 4:
          game.inventory.splice(game.inventory.indexOf("Flashbang"),1);
          result = "You throw the flashbang and stun the troll, but what you didn't realize is that the troll has epilepsy. You walk past him. (-Flashbang)"
          break;
        default:
          break;
      }
      break;
    //Room 2
    case 2:
      switch(optionID) {
        case 1:
          game.health -= 10;
          game.inventory.push("Torch");
          result = "You try to jump over the pit, but fall short of the other side. The pit isn't as deep as you thought, but you hurt your legs falling. Next to you lies an unlit torch. You pick it up and right after a stalactite comes crashing down where the torch previously lay. You then climb out of the pit and reach the other side. (-10 Health) (+Torch)";
          break;
        case 2:
          result = "The pit isn't as deep as you thought. You climb down and see an unlit torch in the middle of the room. As you walk toward it to pick it up, a stalactite comes crashing down and breaks the torch into pieces. You then climb out of the pit, unscathed, and reach the other side.";
          break;
        case 3:
          game.inventory.splice(game.inventory.indexOf("Large Plank"),1);
          result = "You lay the Large Plank down and it barely reaches the other side of the pit. You walk across cautiously trying as hard as you can not to look down. You make it across safely, but when you attempt to pick the plank up, a stalactite comes crashing down breaking the plank in half. (- Large Plank)"
          break;
        default:
          break;
      }
      break;
    //Room 3
    case 3:
      switch(optionID) {
        case 1:
          game.gold += 15;
          result = "You open the first chest and find 15 gold inside. Then the room begins to shake and a hidden door opens up. You run to the door as the room collapses behind you. (+15 Gold)";
          break;
        case 2:
          game.health += 15;
          result = "You open the second chest and find a health potion inside. You are so excited that you drink it immediately. Then the room begins to shake and a hidden door opens up. You run to the door as the room collapses behind you. (+15 Health)"
          break;
        case 3:
          game.inventory.push("Chicken Leg");
          result = "You open the third chest and find a Chicken Leg inside. You're not hungry so you save it for later. Then the room begins to shake and a hidden door opens up. You run to the door as the room collapses behind you. (+ Chicken Leg)"
          break;
        case 4:
          game.gold += 15;
          game.health += 15;
          game.inventory.push("Chicken Leg");
          game.inventory.splice(game.inventory.indexOf("Rope"),1);
          result = "You use the rope to tie all 3 of the chests together and then the room begins to shake and a hidden door opens up. You pull the chests through the door as the room collapses behind you and barely save them and more importantly yourself. The rope breaks in the process, but you find gold, a health potion, and a Chicken Leg. You're hungry after almost being crushed so you drink the health potion but save the Chicken Leg. (+ 15 Gold) (+15 Health) (+ Chicken Leg)"
        default:
          break;
      }
      break;
    //Room 4
    case 4:
      switch(optionID) {
        case 1:
          game.gold -= 10;
          game.inventory.push("Rope");
          result = "You purchased Rope.";
          break;
        case 2:
          game.gold -= 15;
          game.inventory.push("Rope");
          result = "You purchased a Flashbang. (+ Flashbang)"
          break;
        case 3:
          game.health += 15;
          game.gold -= 15;
          result = "You purchased a MedKit. (+15 Health)"
          break;
        case 4:
          game.gold += 1;
          result = "The merchant seems to take pity on you and flips you a coin. (+1 Gold) " 
        default:
          break;
      }
      break;
    //Room 5
    case 5:
      switch(optionID) {
        case 1:
          result = "You quickly flip through the book before proclaiming, Everyone romaine calm, the plant stops for a moment before giggling with delight as you quickly exit the room.";
          break;
        case 2:
          game.health -= 5
          result = "The plant attempts to get you attention asking you to feed him, you quickly slink out of the room before becoming lunch, not before getting cut on a thorn. (-5 Health)";
          break;
        case 3:
          game.health -= 15;
          result = "The plant ignores the Chicken Leg and attacks you. (-15 Health)."
          break;
        case 4:
          game.health -= 25
          result = "You throw a nearby rock as hard as you can, and all it seems to do it make the plant angry as he takes a bite out of you. (-25 Health)";
          break;
        default:
          break;
      }
      break;
    //Room 6
    case 6:
      switch(optionID) {
        case 1:
          game.health -= 10;
          result = "The woman unleashes a swarm of bats that scratch and scrape you. (-10 Health)";
          break;
        case 2:
          game.gold -= 10;
          if(game.gold < 0) {
            game.gold = 0;
          }
          result = "The woman pickpockets you and vanishes. (-10 Gold)"
          break;
        case 3:
          result = "Correct! The mysterious woman lets out an evil laugh and disappears."
          break;
        default:
          break;
      }
      break;
    //room 7
    case 7:
      switch(optionID) {
        case 1:
          game.gold -= 10;
          if(game.gold >= 0){
            result = "On closer inspection you find the grond is pretty slippery and you fall in, You hear some coins fall out"
          } else {
            game.gold = 0;
            result = "On closer inspection you find the grond is pretty slippery and you fall in, may have lost some coin if you had some."
          }
          break;
        case 2:
          game.health += -20;
          result = "Its cold and brutal but you get through the room, after losing a toe or 2 (-20 health)"
          break;
        case 3:
          result = "quick on your feet you light up a torch and pass through warm along the way"
          break;
      }
      break;
    //room 8
    case 8:
      switch(optionID) {
        case 1:
          game.health += -15;
          result = "The food is rancid and rotten, what possessed you to eat it. (-15 Health)"
          break;
        case 2:
          game.health += -5;
          game.inventory.push("Key");
          result = "While the fluid is vile something interesting was at the bottom, a Key. (+ Key)";
          break;
        case 3:
          game.gold += 25;
          result = "The food may have gone bad, but their coin has not. (+25 Gold)"
          break;
        case 4:
          game.inventory.splice(game.inventory.indexOf("Chicken Leg"),1);
          result = "A great fly with a crown appears and nods in thanks. (- Chicken Leg)";
          break;
      }
        break;
    //room 9
    case 9:
      switch(optionID) {
        case 1:
          game.health += 10;
          result = "The water is refreshing and fills you with strength";
          break;
        case 2:
          game.gold --;
          game.inventory.push("Sword");
          result = "as you throw the coin down you hear a yelp and a Sword come flying up, maybe look before you wish. (-1 Gold) (+ Sword)";
          break;
        case 3:
          result = "You descend down the well until you meet a large snail, he greets you kindly as he states his name Keven.";
          break;
      }
      break;
    //room 10
    case 10:
      switch(optionID) {
        case 1:
          game.inventory.push("Key");
          result = "As you begin to sneak around the goblin notices you. He appreciates you being quiet in the library and points you toward a small box that contains a Key. (+ Key)";
          break;
        case 2:
          result = "You jont up to the goblin and at first startle him. The goblin explains he's been reading a book about anti gravity saying \”It's impossible to put down\”.";
          break;
        case 3:
          game.gold += 30;
          game.health -= 10;
          result = "You raise up your sword and rush the goblin, in his shock the goblin reaches for his books and begins to pelt you with them. You ultimately slay the goblin and take his coins but MAN to books bruse. (+30 Gold) (-10 Health)";
          break;
        case 4:
          game.inventory.splice(game.inventory.indexOf("Flashbang"),1);
          game.health -= 30;
          result = "You pull the pin and the whole room goes white. The goblin panics, you panic, and the shadow monster in the corner panics. You quickly realize there is a shadow creature and run before he consumes too much of your soul. (-30 Health) (- Flashbang)";
          break;
      }
      break;
    //room 11
    case 11:
      switch(optionID) {
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          break;
      }
      break;
    //room 12
    case 12:
      switch(optionID) {
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          break;
      }
      break;
    //room 13
    case 13:
      switch(optionID) {
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          break;
      }
      break;
    //room 14
    case 14:
      switch(optionID) {
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          break;
      }
      break;
    //room 15
    case 15:
      switch(optionID) {
        case 1:
          result = "You can tell that there is something special about this room, but not what or how to reveal it. You decide to move on.";
          break;
        case 2:
          game.inventory.splice(game.inventory.indexOf("Torch"),1);
          result = "After lighting the torch, you can see the inscription on the wall. It reads, \'Return here when you possess items of confusion, consumption, and climbing.\'";
          break;
        case 3:
          game.inventory.splice(game.inventory.indexOf("Sword"),1);
          result = "You swing the sword at the wall and it breaks. In hindsight, you realize that there was no other possible outcome from such an action.";
          break;
        case 4:
          result = "You somehow use this strange combination of items to complete an arbitrary quest designed by the 408 group. You win!";
          status = "Win";
          break;
      }
      break;
    default:
      break;
  }

  for (var i = 0; i < game.inventory.length; i++) {
    for (var j = i+1; j < game.inventory.length; j++) {
      if (game.inventory[i] == game.inventory[j]) {
        var saved = game.inventory[i];
        game.inventory.splice(game.inventory.indexOf(saved),1);
        game.gold += 10;
        result += " Sorry, duplicate items are hard to implement. Here's 10 gold. (+10 Gold)";
      }
    }
  }

  if (game.health > 100) {
    game.health = 100;
  }

  var sql = "DELETE FROM UserGameInventory WHERE username = '" + game.username + "'";
  con.query(sql, function(err, result) {
    if (err) throw err;
  });
  sql = "DELETE FROM UserGameTrophies WHERE username = '" + game.username + "'";
  con.query(sql, function(err, result) {
    if (err) throw err;
  });
  sql = "UPDATE UserGames SET health = " + game.health + ", gold = " + game.gold + " WHERE username = '" + game.username + "'";
  con.query(sql, function(err, result) {
    if (err) throw err;
  });

  for(var i = 0; i < game.inventory.length; i++) {
    sql = "INSERT INTO UserGameInventory (username, item) VALUES ('" + game.username + "', '" + game.inventory[i]  + "')";
    con.query(sql, function(err, result) {
      if (err) throw err;
    });
  } 

  for(var i = 0; i < game.trophies.length; i++) {
    sql = "INSERT INTO UserGameTrophies (username, trophy) VALUES ('" + game.username + "', '" + game.trophies[i]  + "')";
    con.query(sql, function(err, result) {
      if (err) throw err;
    });
  } 

  if (game.health <= 0) {
    status = "Lose";
  }
  var data = {game, result, status};
  res.json(data);
});

//Continue an existing game
app.post("/continue", (req, res, next) => {
  var obj = req.body;
  var username = obj.username;
  
  var sql = "SELECT * FROM UserGames WHERE username = '" + username + "'";
  con.query(sql, function(err, result) {
    if (err) throw err;
    if (result.length > 0) {
      var game = {
        username : result[0].username,
        health : result[0].health,
        gold : result[0].gold,
        roomID : result[0].roomID,
        inventory : [],
        recentRooms : [],
        trophies : []
      }
      sql = "SELECT * FROM UserGameInventory WHERE username = '" + username + "'";
      con.query(sql, function(err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
          game.inventory.push(result[i].item);
        }
      });
      sql = "SELECT * FROM UserGameRecentRooms WHERE username = '" + username + "'";
      con.query(sql, function(err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
          game.recentRooms.push(result[i].roomID);
        }
      });
      sql = "SELECT * FROM UserGameTrophies WHERE username = '" + username + "'";
      con.query(sql, function(err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
          game.trophies.push(result[i].trophy);
        }
        res.json(game);
      });
    }else {
      res.json("Failure");
    }
  });
});

//End existing game
app.post("/endgame", (req, res, next) => {
  var obj = req.body;
  var game = obj.game;
  var status = obj.status;
  var sql;

  if (status == "Win") {
    for (var i = 0; i < game.trophies.length; i++) {
      sql = "INSERT IGNORE INTO UserTrophies (trophy, username) VALUES (" + game.trophies[i] + ", '" + game.username + "')";
      con.query(sql, function(err, result) { 
        if (err) {
          throw err;
        } 
      });
    }
    var overall = game.health + game.gold + game.inventory.length * 10 + game.trophies.length * 25;
    sql = "INSERT IGNORE INTO Scores (username, score) VALUES ('" + game.username + "', " + overall + ")";
    con.query(sql, function(err, result) { 
      if (err) throw err;
    });
  }
    //Cleanup time
    sql = "DELETE FROM UserGameInventory WHERE username = '" + game.username + "'";
    con.query(sql, function(err, result) { 
      if (err) throw err;
    });
    sql = "DELETE FROM UserGames WHERE username = '" + game.username + "'";
    con.query(sql, function(err, result) { 
      if (err) throw err;
    });
    sql = "DELETE FROM UserGameRecentRooms WHERE username = '" + game.username + "'";
    con.query(sql, function(err, result) { 
      if (err) throw err;
    });
    sql = "DELETE FROM UserGameTrophies WHERE username = '" + game.username + "'";
    con.query(sql, function(err, result) { 
      if (err) throw err;
      res.json(overall);
    });
});

//Host
app.listen(process.env.PORT || 3000, () => {
 console.log("Server running");
});

app.post("/gametrophies", (req, res, next) => {
  var obj = req.body;
  var trophies = obj.trophies;
  var sql;
  var data = [];

  for (var i = 0; i < trophies.length; i++) {
    sql = "SELECT * FROM Trophies WHERE id = " + trophies[i];
    con.query(sql, function(err, result) {
      if (err) throw err;
      data.push(result[0]);
    });
  }
  res.json(data);
});