var assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);

//Testing Basic Account Functions
describe('Test Account Basic Functionality', () => {
    it('Create Test User', (done) => {
        let user = {
            username: "testuser",
            password: "testpassword",
            email: "test@test.com"
        }
      chai.request('https://stormy-journey-75510.herokuapp.com')
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
      chai.request('https://stormy-journey-75510.herokuapp.com')
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
      chai.request('https://stormy-journey-75510.herokuapp.com')
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
      chai.request('https://stormy-journey-75510.herokuapp.com')
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
      chai.request('https://stormy-journey-75510.herokuapp.com')
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
      chai.request('https://stormy-journey-75510.herokuapp.com')
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
      chai.request('https://stormy-journey-75510.herokuapp.com')
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
      chai.request('https://stormy-journey-75510.herokuapp.com')
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
      chai.request('https://stormy-journey-75510.herokuapp.com')
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
      chai.request('https://stormy-journey-75510.herokuapp.com')
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
      chai.request('https://stormy-journey-75510.herokuapp.com')
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
      chai.request('https://stormy-journey-75510.herokuapp.com')
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
      chai.request('https://stormy-journey-75510.herokuapp.com')
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
      chai.request('https://stormy-journey-75510.herokuapp.com')
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
      chai.request('https://stormy-journey-75510.herokuapp.com')
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
      chai.request('https://stormy-journey-75510.herokuapp.com')
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
      chai.request('https://stormy-journey-75510.herokuapp.com')
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
      chai.request('https://stormy-journey-75510.herokuapp.com')
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
      chai.request('https://stormy-journey-75510.herokuapp.com')
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
      chai.request('https://stormy-journey-75510.herokuapp.com')
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
      chai.request('https://stormy-journey-75510.herokuapp.com')
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
      chai.request('https://stormy-journey-75510.herokuapp.com')
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
      chai.request('https://stormy-journey-75510.herokuapp.com')
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
      chai.request('https://stormy-journey-75510.herokuapp.com')
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
      chai.request('https://stormy-journey-75510.herokuapp.com')
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
      chai.request('https://stormy-journey-75510.herokuapp.com')
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
      chai.request('https://stormy-journey-75510.herokuapp.com')
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
      chai.request('https://stormy-journey-75510.herokuapp.com')
          .post('/deletetest')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.equal("Success");
            done();
          });
    });
});