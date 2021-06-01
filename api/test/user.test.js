let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let app = require('../app');
let should = chai.should();
let expect = require('chai').expect;
let request = require('supertest');
let status = request.status;
let bcrypt = require('bcrypt')

let User = require('../models/User')
const userCredentials = {username: "testuser", password: "password"};
var Cookies;

describe('User Login Tests', () => {
	before((done) => {
		// User.destroy({ where: { username: "testuser" }});
		let user = new User({
			first_name: "Test",
			last_name: "Test",
			email: "test@test.com",
			username: "testuser",
			password: bcrypt.hashSync("password", 10)
		});
		user.save();
		done();
	});

	describe('/POST userLogin valid', () => {
		it('should return 302 authorized user', (done) => {
			request(app)
			.post('/userLogin')
			.send(userCredentials)
			.end(function(err, res) {
				expect(res.statusCode).to.equal(302);
				expect(res.headers['location']).to.equal('/userHome');
				Cookies = res.headers['set-cookie'].pop().split(';')[0];
				done();
			});
		})
	})

	describe('/POST userLogin invalid', () => {
		it('should return 401 unathorized', (done) => {
			request(app)
			.post('/userLogin')
			.send({username: "foo", password: "bar"})
			.end((err, res) => {
				expect(res.statusCode).to.equal(401);
				done();
			})
		})
	})

	describe('/GET userHome authorized', () => {
		it('should return 200 response authorized adminHome', (done) => {
			request(app)
			.get('/userHome')
			.set('Cookie', Cookies)
			.expect('Content-Type', /json/)
			.end(function(err, res) {
				expect(res.statusCode).to.equal(200);
				expect(res.headers['location']).to.equal('/userHome');
				done();
			});
		});    
	});

})
