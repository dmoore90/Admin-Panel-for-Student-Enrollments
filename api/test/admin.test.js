// var chai = require('chai');
// var expect = require('chai').expect;
// var app = require('../app');
// var request = require('supertest');
// var should = chai.should();

let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let app = require('../app');
let should = chai.should();
let expect = require('chai').expect;
let request = require('supertest');
let status = request.status;

const userCredentials = {
  username: 'admin', 
  password: 'password'
}

const fakeCredentials = {
  username: 'foo',
  password: 'bar'
}

var Cookies;
var authenticatedUser = request.agent(app);

describe('Admin Login Tests', (done) => {

  // invalid POST adminLogin
  it('should return 401 response unauthorized for adminHome redirect', (done) => {
    authenticatedUser
    .post('/adminLogin')
    .send(fakeCredentials)
    .end((err, res) => {
      expect(res.statusCode).to.equal(401);
      done();
    });
  });

  // valid POST adminLogin
  it('should return 302 response authorized redirect to adminHome', (done) => {
    authenticatedUser
    .post('/adminLogin')
    .send(userCredentials)
    .end(function(err, res) {
      expect(res.statusCode).to.equal(302);
      expect(res.headers['location']).to.equal('adminHome');
      Cookies = res.headers['set-cookie'].pop().split(';')[0];
      done();
    });
  });

  // invalid GET adminHome
  it('should return a 401 response unauthorized', (done) => {
    request(app).get('/adminHome')
    .expect(401, done);
  });

  // valid GET adminHome
  it('should return 200 response authorized adminHome', (done) => {
    request(app).get('/adminHome')
    .set('Cookie', Cookies)
    .end(function(err, res) {
      expect(res.statusCode).to.equal(200);
      expect(res.headers['location']).to.equal('adminHome');
      done();
    });
  });

  // valid POST adminLogout
  it('should return 200 response valid adminLogout', (done) => {
    var req = request(app).post('/adminLogout');
    req.cookies = Cookies;
    req.end(function(err, res) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  // invalid POST adminLogout
  it('should return 401 response invalid adminLogut', (done) => {
    request(app).post('/adminLogout')
    .end((err, res) => {
      expect(res.statusCode).to.equal(401);
      done();
    });
  });

  // getUsers test display users in admin
  it('should return 200 and validate users array', (done) => {
    request(app).get('/users')
    .set('Cookie', Cookies)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      expect(res.body).to.be.an.instanceof(Array)
      .and.to.have.property(0)
      .that.includes.all.keys([ 'id', 'first_name', 'last_name', 'email', 'username']);
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  // postUser test
  it('it should POST a user, 302 redirect to users', (done) => {
    let user = {
      first_name: "Test",
      last_name: "Test",
      email: "test@test.com",
      username: "Test",
      password: "password",
      pass_confirmation: "password"
    }
    request(app).post('/postUser')
    .set('Cookie', Cookies)
    .send(user)
    .end((err, res) => {
      res.should.have.status(302);
      expect(res.headers['location']).to.equal('users');
      done();
    });
  });

  //
});
