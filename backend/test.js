var assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);


describe('/POST newuser', () => {
    it('It should create a test user and delete it', (done) => {
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
});

describe('/POST login', () => {
    it('It should login to the test user', (done) => {
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
});

describe('/POST deletetest', () => {
    it('It should login to the test user', (done) => {
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