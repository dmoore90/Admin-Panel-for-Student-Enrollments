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

exports.getUserLogin = (req, res) => {
 	res.sendStatus(200);
}

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
						return res.redirect('userHome')
					} else {
						return res.sendStatus(401);
					}
				})
				.catch(err => {
					console.log(err);
				})
		})
}

exports.getUserHome = (req, res) => {
	const username = req.user.username;
	Enrollment.findAll({ where: { username: username }})
	.then(enrollments => {
		return res.status(200).json(enrollments);
	})
	.catch(err => { console.log(err) })
}

exports.postUserLogout = (req, res, next) => {
	const authHeader = req.headers['cookie']
	const token = authHeader && authHeader.split('=')[1]
	const decoded = jwt.verify(token, JWT_KEY.secret);
	const userId = decoded.id;
	const admin = decoded.username;
	res.clearCookie('auth')

	return res.redirect('userLogin');
}

