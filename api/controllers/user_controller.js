const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateJWT = require('../security/authenticateJWT');
require('dotenv').config();
const localStorage = require('local-storage');
const JWT_KEY = require('../config/security');

// User Login Section

// find user in database authenticate, sign token, save cookie and redirect to /userHome
exports.postUserLogin = (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	User.findOne({ where: { username: username, role: "NOSUPERUSER" } })
		.then(user => {
			if (!user) {
				res.sendStatus(401);
			}
			bcrypt.compare(password, user.password)
				.then(success => {
					if (success) {
			        	const token = jwt.sign({ id: user.dataValues.id, username: user.username }, JWT_KEY.secret, { expiresIn: "1h" });
						res.cookie('auth', token);
						return res.redirect('/userHome')
					} else {
						return res.sendStatus(401);
					}
				})
				.catch(err => {
					console.log(err);
				})
		})
}

// find enrollments with signed in user and return as json
exports.getUserHome = (req, res) => {
	const username = req.user.username;
	Enrollment.findAll({ where: { username: username }})
	.then(enrollments => {
		res.location('/userHome')
		return res.status(200).json(enrollments);
	})
	.catch(err => { console.log(err) })
}

// destroy cookie and respond 200
exports.postUserLogout = (req, res, next) => {
	res.clearCookie('auth')
	return res.sendStatus(200);
}

