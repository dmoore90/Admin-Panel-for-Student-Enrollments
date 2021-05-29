var expect = require('chai').expect;
var app = require('../app');
var request = require('supertest');

const userCredentials = {
  username: 'admin', 
  password: 'password'
}

var Cookies;
var authenticatedUser = request.agent(app);

describe('Admin Login Tests', function(done){

  it('should post adminLogin', function(done) {
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

});