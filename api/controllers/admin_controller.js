const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateJWT = require('../security/authenticateJWT');
require('dotenv').config();
const localStorage = require('local-storage');
const JWT_KEY = require('../config/security');
const path = require('path');
const formValidation = require('./formValidation')

// authenticate user, if valid, sign jwt token save cookie redirect /adminHome
exports.postAdminLogin = (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	User.findOne({ where: { username: username } })
		.then(user => {
			if (!user) {
				return res.sendStatus(401);
			}
			bcrypt.compare(password, user.password)
				.then(success => {
					if (success) {
			        	const token = jwt.sign({ id: user.dataValues.id, username: user.username }, JWT_KEY.secret, { expiresIn: "1h" });
						res.cookie('auth', token, { httpOnly: true, secure: true, sameSite: true });
						res.redirect('adminHome')
					} else {
						return res.sendStatus(401);
					}
				})
				.catch(err => {
					console.log(err);
				})
		})
}
// returns adminHome page with json for username admin
exports.getAdminHome = (req, res) => {
	var username = [req.user.username];
	if (username == "admin") {
		res.location('adminHome')
		return res.status(200).json(username)
	} else {
		return res.status(401);
	}
}
// destroy jwt cookie for logout
exports.postAdminLogout = (req, res) => {
	if (req.user.username != "admin") {
		return res.sendStatus(401);
	}
	res.clearCookie('auth');
	return res.sendStatus(200);
}

// Users Section

//retrive users array and return json to /users
exports.getUsers = (req, res) => {
	if (req.user.username != "admin") {
		return res.sendStatus(401);
	}
	User.findAll({
		where: { role: 'NOSUPERUSER'}
	})
		.then(users => {
			res.location('/users')
			return res.status(200).json(users);
		})
		.catch(err => {
			console.log(err);
		})
}
// post new user to database
exports.postUser = (req, res) => {
	if (req.user.username != "admin") {
		return res.sendStatus(401);
	}
	const first_name = formValidation.validateName(req.body.first_name);
	const last_name = formValidation.validateName(req.body.last_name);
	const email = formValidation.validateEmail(req.body.email);
	const username = formValidation.validateName(req.body.username);
	const password = req.body.password;
	const pass_confirmation = req.body.pass_confirmation;

	if (formValidation.validatePassword(password, pass_confirmation)) {
		const hashedPassword = bcrypt.hashSync(password, 10);
		User.create({
			first_name: first_name,
			last_name: last_name,
			email: email,
			username: username,
			password: hashedPassword
		})
		.then(result => {
			return res.redirect('users');
		}).catch(err => { return res.sendStatus(400) });
	} else {
		return res.sendStatus(400);
	}
}
// get user form database by id respond json
exports.getUpdateUser = (req, res) => {
	if (req.user.username != "admin") {
		return res.sendStatus(401);
	}
	const id = req.params.id;
	User.findByPk(id)
		.then(user => {
			return res.json(user);
		})
		.catch(err => {
			console.log(err);
		})
}

// find user by id and save changed values to db
exports.postUpdateUser = (req, res) => {
	if (req.user.username != "admin") {
		return res.sendStatus(401);
	}
	const id = req.body.id;
	const updated_first_name = formValidation.validateName(req.body.first_name);
	const updated_last_name = formValidation.validateName(req.body.last_name);
	const updated_email = formValidation.validateEmail(req.body.email);
	const updated_username = formValidation.validateName(req.body.username);
	User.findByPk(id)
		.then(user => {
			user.first_name = updated_first_name;
			user.last_name = updated_last_name;
			user.email = updated_email;
			user.username = updated_username;
			return user.save();
		})
		.then(result => {
			res.redirect('/users');
		})
		.catch(err => {
			console.log(err);
		})
}
// destroy user object by id
exports.postDeleteUser = (req, res) => {
	if (req.user.username != "admin") {
		return res.sendStatus(401);
	}
	const id = req.body.id;
	User.destroy({ where: { id: id }})
		.then(result => {
			res.redirect('/users');
		})
		.catch(err => { console.log(err) });
}


// Courses Section

// get courses and return json
exports.getCourses = (req, res) => {
	if (req.user.username != "admin") {
		return res.sendStatus(401);
	}

	Course.findAll()
	.then(courses => {
		res.location('/courses')
		return res.status(200).json(courses);
	})
	.catch(err => {
		console.log(err);
		return res.sendStatus(404)
	})
}

// create new course and redirect /courses
exports.postCourse = (req, res) => {
	if (req.user.username != "admin") {
		return res.sendStatus(401);
	}

	const course_name = req.body.course_name;
	const beginning_date = req.body.beginning_date;
	const ending_date = req.body.ending_date;
	const instructor = req.body.instructor;
	Course.create({
		course_name: course_name,
		beginning_date: beginning_date,
		ending_date: ending_date,
		instructor: instructor
	}).then(results => {
		return res.redirect('/courses')
	}).catch(err => { 
		console.log(err) 
	})
}

// find course by id and return json
exports.getUpdateCourse = (req, res) => {
	if (req.user.username != "admin") {
		return res.sendStatus(401);
	}	
	const id = req.params.id;
	Course.findByPk(id)
		.then(course => {
			return res.json(course);
		})
		.catch(err => {
			console.log(err);
		})
}

// find course by id and save changed values to db
exports.postUpdateCourse = (req, res) => {
	if (req.user.username != "admin") {
		return res.sendStatus(401);
	}
	const id = req.body.id;
	const course_name = req.body.course_name;
	const beginning_date = req.body.beginning_date;
	const ending_date = req.body.ending_date;
	const instructor = req.body.instructor;
	Course.findByPk(id)
		.then(course => {
			course.course_name = course_name;
			course.beginning_date = beginning_date;
			course.ending_date = ending_date;
			course.instructor = instructor;
			return course.save();
		})
		.then(result => {
			res.redirect('/courses');
		})
		.catch(err => {
			console.log(err);
		})
}

// find course by id and delete from db
exports.deleteCourse = (req, res) => {
	if (req.user.username != "admin") {
		return res.sendStatus(401);
	}
	const id = req.body.id;
	Course.destroy({ where: { id: id }})
		.then(result => {
			res.redirect('/courses');
		})
		.catch(err => { console.log(err) });
}

// Enrollment

// get enrollments and return json
exports.getEnrollments = (req, res) => {
	if (req.user.username != "admin") {
		return res.sendStatus(401);
	}
	Enrollment.findAll()
	.then(enrollments => {
		res.location('/enrollments');
		return res.json(enrollments);

	})
	.catch(err => { console.log(err) })
}

// create new enrollment and redirect /enrollments
exports.postEnrollment = (req, res) => {
	if (req.user.username != "admin") {
		return res.sendStatus(401);
	}
	const course_name = req.body.course_name;
	const username = req.body.username;
	
	Enrollment.create({
		course_name: course_name,
		username: username
	}).then(results => {
		res.redirect('/enrollments')
	}).catch(err => {
		console.log(err)
	})
}

// find course by id and return json
exports.getUpdateEnrollment = (req, res) => {
	if (req.user.username != "admin") {
		return res.sendStatus(401);
	}
	const id = req.params.id;
	Enrollment.findByPk(id)
	.then(enrollment => {
		return res.json(enrollment);
	})
	.catch(err => console.log(err));
}

// find course by id and save changed values to db
exports.postUpdateEnrollment = (req, res) => {
	if (req.user.username != "admin") {
		return res.sendStatus(401);
	}
	const id = req.body.id;
	const course_name = req.body.course_name;
	const username = req.body.username;
	Enrollment.findByPk(id)
		.then(enrollment => {
			enrollment.course_name = course_name;
			enrollment.username = username;
			return enrollment.save();
		})
		.then(result => {
			res.redirect('/enrollments');
		})
		.catch(err => {
			console.log(err);
		})
}

// find course by id and delete from db
exports.deleteEnrollment = (req, res) => {
	if (req.user.username != "admin") {
		return res.sendStatus(401);
	}
	const id = req.body.id;
	Enrollment.destroy({ where: { id: id }})
		.then(result => {
			res.redirect('/enrollments');
		})
		.catch(err => { console.log(err) });
}