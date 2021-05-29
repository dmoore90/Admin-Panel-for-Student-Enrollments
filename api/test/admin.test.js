var expect = require('chai').expect;
var app = require('../app');
var request = require('supertest');

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

describe('Admin Login Tests', function(done){

  // invalid post adminLogin
  it('should post 401', function(done) {
    authenticatedUser
    .post('/adminLogin')
    .send(fakeCredentials)
    .end((err, res) => {
      expect(res.statusCode).to.equal(401);
      done();
    })
  })

  // valid post adminLogin 
  it('should post adminLogin, redirect 302', function(done) {
    authenticatedUser
    .post('/adminLogin')
    .send(userCredentials)
    .end(function(err, res) {
      expect(res.statusCode).to.equal(302);
      expect(res.headers['location']).to.equal('adminHome')
      Cookies = res.headers['set-cookie'].pop().split(';')[0];
      done();
    })
  })

  // not logged in to adminHome
  it('should return a 401 response', function(done){
    request(app).get('/adminHome')
    .expect(401, done);
  });

  // logged in to adminHome
  it('should return a 200 response if the user is logged in', function(done){
    request(app).get('/adminHome')
    .set('Cookie', Cookies)
    .end(function(err, res) {
      expect(res.statusCode).to.equal(200);
      expect(res.headers['location']).to.equal('adminHome')
      done()
    })
  });

  // admin logout test
  it('should return 200 response with post adminLogout', function(done) {
    // request(app).post('/adminLogout').set('Cookie', Cookies)
    var req = request(app).post('/adminLogout');
    req.cookies = Cookies;
    req.end(function(err, res) {
      expect(res.statusCode).to.equal(200);
      done();
    })
  });

  // admin logout test no auth
  it('should return 401 response post adminLogout no cookies', function(done) {
    request(app).post('/adminLogout')
    .end((err, res) => {
      expect(res.statusCode).to.equal(401);
      done();
    })
  })

  

});