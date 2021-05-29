
// var expect = require('chai').expect;
// var app = require('../app');
// var request = require('supertest');

// const userCredentials = {
//   username: 'admin', 
//   password: 'password'
// }
// //now let's login the user before we run any tests
// var authenticatedUser = request.agent(app);
// before(function(done){
//   authenticatedUser
//     .post('/adminLogin')
//     .send(userCredentials)
//     .end(function(err, response){
//       expect(response.statusCode).to.equal(302);
//       expect('Location', '/adminHome');
//       done();
//     });
// });

// describe('GET /adminHome', function(done){
// //addresses 1st bullet point: if the user is logged in we should get a 200 status code
//   it('should return a 200 response if the user is logged in', function(done){
//     authenticatedUser.get('/adminHome')
//     .expect(200, done);
//   });

//   it('should return a 302 response and redirect to /login', function(done){
//     request(app).get('/adminHome')
//     .expect('Location', '/adminLogin')
//     .expect(302, done);
//   });

// });


var expect = require('chai').expect;
var app = require('../app');
var request = require('supertest');

const userCredentials = {
  username: 'admin', 
  password: 'password'
}

var Cookies;
//now let's login the user before we run any tests
var authenticatedUser = request.agent(app);
// before(function(done){
//   authenticatedUser
//     .post('/adminLogin')
//     .send(userCredentials)
//     .end(function(err, res){
//       expect(res.statusCode).to.equal(302);
//       expect('Location', '/adminHome');
//       done();
//     });
// });

describe('Admin Login Tests', function(done){

  it('should post adminLogin', function(done) {
    authenticatedUser
    .post('/adminLogin')
    .send(userCredentials)
    .end(function(err, res) {
      expect(res.statusCode).to.equal(302);
      expect('Location', '/adminHome');
      Cookies = res.headers['set-cookie'].pop().split(';')[0];
      done();
    })
  })
  // not logged in to adminHome
  it('should return a 401 response', function(done){
    request(app).get('/adminHome')
    // .set('Cookie', Cookies)
    .expect(401, done);
  });
  // logged in to adminHome
  it('should return a 200 response if the user is logged in', function(done){
    request(app).get('/adminHome')
    .set('Cookie', Cookies)
    .expect(200, done)
  });

});