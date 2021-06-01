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

const bcrypt = require('bcrypt');
let sequelize = require('sequelize');
let User = require('../models/User');
let Course = require('../models/Course');

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

describe('Admin Controller Tests', () => {
  beforeEach((done) => {
    User.destroy({ where: { username: "testuser" }});
    done();
  });

  describe('/POST adminLogin invalid', () => {
    it('should return 401 response unauthorized for adminHome redirect', (done) => {
      authenticatedUser
      .post('/adminLogin')
      .send(fakeCredentials)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        done();
      });
    });    
  });

  describe('/POST adminlogin valid', () => {
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
  });

  describe('/GET adminHome unauthorized', () => {
    it('should return a 401 response unauthorized', (done) => {
      request(app).get('/adminHome')
      .expect(401, done);
    });
  });

  describe('/GET adminHome authorized', () => {
    it('should return 200 response authorized adminHome', (done) => {
      request(app).get('/adminHome')
      .set('Cookie', Cookies)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res.headers['location']).to.equal('adminHome');
        done();
      });
    });    
  });

  describe('/POST adminLogout authorized', () => {
    it('should return 200 response valid adminLogout', (done) => {
      var req = request(app).post('/adminLogout');
      req.cookies = Cookies;
      req.end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('/POST adminLogout unauthorized', () => {
    it('should return 401 response invalid adminLogut', (done) => {
      request(app).post('/adminLogout')
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        done();
      });
    });
  });

  describe('/GET users array', () => {
    it('should return 200 and validate users array', (done) => {
      request(app).get('/users')
      .set('Cookie', Cookies)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.headers['location']).to.equal('/users');
        expect(res.body).to.be.an.instanceof(Array)
        .and.to.have.property(0)
        .that.includes.all.keys([ 'id', 'first_name', 'last_name', 'email', 'username']);
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('/POST postUser', () => {
    it('it should POST a user, 302 redirect to users', (done) => {
      const user = {
        first_name: "Test",
        last_name: "Test",
        email: "test@test.com",
        username: "testuser",
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
  });

  describe('/POST postUser invalid data', () => {
    it('it should not POST user expect response 400', (done) => {
      let fakeuser = {
        first_name: "",
        last_name: "Test",
        email: "test",
        username: "Test",
        password: "passwordpassword",
        pass_confirmation: "password"
      }
      request(app).post('/postUser')
      .set('Cookie', Cookies)
      .send(fakeuser)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });
  });

  describe('/GET updateUser/:id test', () => {
    it('should GET user and respond 200', (done) => {
      let user = new User({
        first_name: "Test",
        last_name: "Test",
        email: "test@test.com",
        username: "testuser",
        password: bcrypt.hashSync("password", 10)
      });
      user.save().then(u => {
        request(app)
        .get('/updateUser/' + u.id)
        .set('Cookie', Cookies)
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('first_name');
          res.body.should.have.property('last_name');
          res.body.should.have.property('email');
          res.body.should.have.property('username');
          res.body.should.have.property('password');
          done();
        });
      });
    });
  });

  describe('/POST updateUser test', () => {
    it('should POST updated user and respond 302 to users', (done) => {
      let user = new User({
        first_name: "Test",
        last_name: "Test",
        email: "test@test.com",
        username: "testuser",
        password: bcrypt.hashSync("password", 10)
      });
      user.save().then(u => {
        request(app)
        .post('/updateUser')
        .set('Cookie', Cookies)
        .send({id: u.id, first_name: "changedFirstName", last_name: "Test", email: "test@test.com", username: "testuser"})
        .end((err, res) => {
          User.findByPk(u.id).then(result => {
            res.should.have.status(302);
            expect(res.headers['location']).to.equal('/users');
            expect(result.first_name).to.equal("changedFirstName")
            done();
          }).catch(err => { console.log(err) })
        });
      });
    });
  });

  describe('/POST deleteUser test', () => {
    it('should POST deleteUser and respond 302 to users', (done) => {
      let user = new User({
        first_name: "Test",
        last_name: "Test",
        email: "test@test.com",
        username: "testuser",
        password: bcrypt.hashSync("password", 10)
      });
      user.save().then(u => {
        request(app)
        .post('/deleteUser')
        .set('Cookie', Cookies)
        .send({id: u.id})
        .end((err, res) => {
          res.should.have.status(302);
          expect(res.headers['location']).to.equal('/users');
          done();
        });
      });
    });
  });

  describe ('/GET courses test', () => {
    it('should /GET courses and respond 200', (done) => {
      request(app)
      .get('/courses')
      .set('Cookie', Cookies)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        expect(res.headers['location']).to.equal('/courses');
        if (res.body.length > 0) {
          res.body[1].should.have.property('course_name');
          res.body[1].should.have.property('beginning_date');
          res.body[1].should.have.property('ending_date');
          res.body[1].should.have.property('instructor');
        }
        done();
      });
    });
  });

  describe('/POST postCourse test', () => {
    it('it should POST a course, 302 redirect to courses', (done) => {
      const course = {
        course_name: "Test",
        beginning_date: "04/01/2021",
        ending_date: "05/01/2021",
        instructor: "testuser"
      }
      request(app)
      .post('/postCourse')
      .set('Cookie', Cookies)
      .send(course)
      .end((err, res) => {
        res.should.have.status(302);
        expect(res.headers['location']).to.equal('/courses');
        done();
      });
    });
  });
  describe('/GET updateUser/:id test', () => {
    it('should GET course and respond 200', (done) => {
      let course = new Course({
        course_name: "Test",
        beginning_date: "04/01/2021",
        ending_date: "05/01/2021",
        instructor: "Test"
      });
      course.save().then(c => {
        request(app)
        .get('/updateCourse/' + c.id)
        .set('Cookie', Cookies)
        .send(course)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('course_name');
          res.body.should.have.property('beginning_date');
          res.body.should.have.property('ending_date');
          res.body.should.have.property('instructor');
          done();
        });
      });
    });
  });

  describe('/POST updateCourse test', () => {
    it('should POST updated course and respond 302 to courses', (done) => {
      let course = new Course({
        course_name: "Test",
        beginning_date: "04/01/2021",
        ending_date: "05/01/2021",
        instructor: "Test"
      });
      course.save().then(c => {
        request(app)
        .post('/updateCourse')
        .set('Cookie', Cookies)
        .send({id: c.id, course_name: "changedCoursename", beginning_date: "04/01/2021", ending_date: "05/01/2021", instructor: "Test"})
        .end((err, res) => {
          Course.findByPk(c.id).then(result => {
            res.should.have.status(302);
            expect(res.headers['location']).to.equal('/courses');
            expect(result.course_name).to.equal("changedCoursename")
            done();
          }).catch(err => { console.log(err) })
        });
      });
    });
  });

  
});
