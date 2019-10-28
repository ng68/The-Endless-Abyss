var assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
//const url = 'https://stormy-journey-75510.herokuapp.com';
const url = 'http://localhost:3000';

//Testing Basic Account Functions
describe('Test Account Basic Functionality', () => {
    it('Create Test User', (done) => {
        let user = {
            username: "testuser",
            password: "testpassword",
            email: "test@test.com"
        }
      chai.request(url)
          .post('/newuser')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.equal("Success");
            done();
          });
    });
    it('Login to Test User', (done) => {
        let user = {
            username: "testuser",
            password: "testpassword",
            email: "test@test.com"
        }
      chai.request(url)
          .post('/login')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.equal("Success");
            done();
          });
    });
    it('Delete Test User', (done) => {
        let user = {
            username: "testuser",
        }
      chai.request(url)
          .post('/deletetest')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.equal("Success");
            done();
          });
    });
});
//Testing Duplicate Username
describe('Test Duplicate Username', () => {
    it('Create Test User', (done) => {
        let user = {
            username: "testuser",
            password: "testpassword",
            email: "test@test.com"
        }
      chai.request(url)
          .post('/newuser')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.equal("Success");
            done();
          });
    });
    it('Attempt to Create Duplicate Username', (done) => {
        let user = {
            username: "testuser",
            password: "testpassword",
            email: "testuser@testuser.com"
        }
      chai.request(url)
          .post('/newuser')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.equal("Failure Username");
            done();
          });
    });
    it('Delete Test User', (done) => {
        let user = {
            username: "testuser",
        }
      chai.request(url)
          .post('/deletetest')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.equal("Success");
            done();
          });
    });
});
//Testing Duplicate Email
describe('Test Account Basic Functionality', () => {
    it('Create Test User', (done) => {
        let user = {
            username: "testuser",
            password: "testpassword",
            email: "test@test.com"
        }
      chai.request(url)
          .post('/newuser')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.equal("Success");
            done();
          });
    });
    it('Attempt to Create Duplicate Email', (done) => {
        let user = {
            username: "testusername",
            password: "testpassword",
            email: "test@test.com"
        }
      chai.request(url)
          .post('/newuser')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.equal("Failure Email");
            done();
          });
    });
    it('Delete Test User', (done) => {
        let user = {
            username: "testuser",
        }
      chai.request(url)
          .post('/deletetest')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.equal("Success");
            done();
          });
    });
});
//Testing Login Failure
describe('Test Login Failure', () => {
    it('Attempt Failed Login', (done) => {
        let user = {
            username: "mbjdueoslhyrue17560",
            password: "qngiekdughentk18573",
        }
      chai.request(url)
          .post('/login')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.equal("Failure");
            done();
          });
    });
});
//Testing User High Score
describe('Test User High Score', () => {
    it('Create Test User', (done) => {
        let user = {
            username: "testuser",
            password: "testpassword",
            email: "test@test.com"
        }
      chai.request(url)
          .post('/newuser')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.equal("Success");
            done();
          });
    });
    it('Add Score', (done) => {
        let user = {
            username: "testuser",
            score: 100
        }
      chai.request(url)
          .post('/addscoretest')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.equal("Success");
            done();
          });
    });
    it('Retrieve High Score', (done) => {
        let user = {
            username: "testuser",
        }
      chai.request(url)
          .post('/score')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('score');
                res.body[0].score.should.equal(100);
            done();
          });
    });
    it('Delete Test User', (done) => {
        let user = {
            username: "testuser",
        }
      chai.request(url)
          .post('/deletetest')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.equal("Success");
            done();
          });
    });
});
//Testing Change Username
describe('Test Change Username Module', () => {
    it('Create Test User', (done) => {
        let user = {
            username: "testuser",
            password: "testpassword",
            email: "test@test.com"
        }
      chai.request(url)
          .post('/newuser')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.equal("Success");
            done();
          });
    });
    it('Test Invalid Username', (done) => {
        let user = {
            username: "hbneidkqit19847",
            password: "testpassword",
            newUsername: "changeusername"
        }
      chai.request(url)
          .post('/changeusername')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.equal("Username does not exist.");
            done();
          });
    });
    it('Test Invalid Password', (done) => {
        let user = {
            username: "testuser",
            password: "test",
            newUsername: "changeusername"
        }
      chai.request(url)
          .post('/changeusername')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.equal("Password is incorrect.");
            done();
          });
    });
    it('Test Change Username', (done) => {
        let user = {
            username: "testuser",
            password: "testpassword",
            newUsername: "changeusername"
        }
      chai.request(url)
          .post('/changeusername')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.equal("Success");
            done();
          });
    });
    it('Delete Test User', (done) => {
        let user = {
            username: "changeusername",
        }
      chai.request(url)
          .post('/deletetest')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.equal("Success");
            done();
          });
    });
});
//Testing Change Password
describe('Test Change Password Module', () => {
    it('Create Test User', (done) => {
        let user = {
            username: "testuser",
            password: "testpassword",
            email: "test@test.com"
        }
      chai.request(url)
          .post('/newuser')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.equal("Success");
            done();
          });
    });
    it('Test Invalid Username', (done) => {
        let user = {
            username: "qwbneixekg19285",
            password: "testpassword",
            newPassword: "changepassword"
        }
      chai.request(url)
          .post('/changepassword')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.equal("Username does not exist.");
            done();
          });
    });
    it('Test Invalid Password', (done) => {
        let user = {
            username: "testuser",
            password: "test",
            newPassword: "changepassword"
        }
      chai.request(url)
          .post('/changepassword')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.equal("Password is incorrect.");
            done();
          });
    });
    it('Test Change Password', (done) => {
        let user = {
            username: "testuser",
            password: "testpassword",
            newPassword: "changepassword"
        }
      chai.request(url)
          .post('/changepassword')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.equal("Success");
            done();
          });
    });
    it('Delete Test User', (done) => {
        let user = {
            username: "testuser",
        }
      chai.request(url)
          .post('/deletetest')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.equal("Success");
            done();
          });
    });
});
//Testing User Trophies
describe('Test User Trophies', () => {
    it('Create Test User', (done) => {
        let user = {
            username: "testuser",
            password: "testpassword",
            email: "test@test.com"
        }
      chai.request(url)
          .post('/newuser')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.equal("Success");
            done();
          });
    });
    it('Add Trophy', (done) => {
        let user = {
            username: "testuser",
            trophyID: 1
        }
      chai.request(url)
          .post('/addtrophytest')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.equal("Success");
            done();
          });
    });
    it('Retrieve Trophy List', (done) => {
        let user = {
            username: "testuser",
        }
      chai.request(url)
          .post('/trophies')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('trophy');
                res.body[0].trophy.should.equal(1);
            done();
          });
    });
    it('Delete Test User', (done) => {
        let user = {
            username: "testuser",
        }
      chai.request(url)
          .post('/deletetest')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.equal("Success");
            done();
          });
    });
});
//Testing Game Logic
describe('Test Game Logic', () => {
    it('Create Game for User', (done) => {
        let data = { 
                game : {
                    username : "testuser",
                    gold : 40,
                    health : 30,
                    inventory : ["Flashbang", "Chicken Leg"],
                    roomID : 1,
                    recentRooms : [3,5,7],
                    trophies : [3,5]   
                }
        }
        let expect = {
            options : {
                "1" : "Attack the troll.",
                "2" : "Run around the troll.",
                "3" : "Bribe the troll. (-20 Gold)",
                "4" : "Use the Flashbang."
            },
            result : [
                {
                    roomID : 1,
                    description : "This is a room with a troll. He is menacing.",
                    name : "Cave of the Troll"
                }
            ]
        }
      chai.request(url)
          .post('/enter')
          .send(data)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.eql(expect);
            done();
          });
    });
    it('Change game object', (done) => {
        let data = { 
            game : {
                username : "testuser",
                gold : 40,
                health : 30,
                inventory : ["Flashbang", "Chicken Leg"],
                roomID : 1,
                recentRooms : [3,5,7],
                trophies : [3,5]   
            },
            optionID : "1"
        }
        
        let expect = {
            game: {
                username: "testuser",
                gold: 40,
                health: 0,
                inventory: [
                    "Flashbang",
                    "Chicken Leg"
                ],
                roomID: 1,
                recentRooms: [
                    3,
                    5,
                    7
                ],
                trophies: [
                    3,
                    5
                ]
            },
            result: "As you lunge and attempt to punch the troll in the face, he swiftly dodges and then proceeds to call your mom ugly. Your pride is utterly destroyed. (-30 Health)",
            status: "Lose"
        }
      chai.request(url)
          .post('/exit')
          .send(data)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.eql(expect);
            done();
          });
    });
    it('End game', (done) => {
        let data = {
                game : 
                {
                    gold : 50,
                    health : 30,
                    inventory : ["Flashbang", "Stuff"],
                    roomID : 1,
                    recentRooms : [2, 3],
                    trophies : [3, 5],
                    username : "testuser"
                },
                status : "Win"
        }

        let expect = 150;
      chai.request(url)
          .post('/endgame')
          .send(data)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.equal(expect);
            done();
          });
    });
});