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

// Login Section
// exports.getAdminLogin = (req, res, next) => {
// 	var list = ["<!admin json test!>"];
// 	res.status(200).json(list)
// }

exports.postAdminLogin = (req, res, next) => {
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
						res.setHeader("Location", "/")
						return res.sendStatus(401);
					}
				})
				.catch(err => {
					console.log(err);
				})
		})
}

exports.getAdminHome = (req, res) => {
	var username = [req.user.username];
	if (username == "admin") {
		return res.status(200).json(username)
	} else {
		return res.status(401);
	}
}

exports.postAdminLogout = (req, res, next) => {
	if (req.user.username != "admin") {
		return res.sendStatus(401);
	}
	const authHeader = req.headers['cookie']
	const token = authHeader && authHeader.split('=')[1]
	const decoded = jwt.verify(token, JWT_KEY.secret);
	const userId = decoded.id;
	const admin = decoded.username;
	res.clearCookie('auth')
	return res.sendStatus(200);
}

// Users Section

exports.getUpdateUser = (req, res) => {
	if (req.user.username != "admin") {
		return res.sendStatus(401);
	}
	return res.sendStatus(200);
}

exports.getUsers = (req, res, next) => {
	if (req.user.username != "admin") {
		return res.sendStatus(401);
	}
	const authHeader = req.headers['cookie']
	const token = authHeader && authHeader.split('=')[1]
	const decoded = jwt.verify(token, JWT_KEY.secret);
	const id = decoded.id;
	const username = decoded.username;

	User.findAll({
		where: { role: 'NOSUPERUSER'}
	})
		.then(users => {
			return res.status(200).json(users);
		})
		.catch(err => {
			console.log(err);
		})

}

exports.getCreateUser = (req, res) => {
	if (req.user.username != "admin") {
		return res.sendStatus(401);
	}
	const username = req.user.username;
	return res.status(200).json(username);
}

exports.postUser = (req, res) => {
	if (req.user.username != "admin") {
		return res.sendStatus(401);
	}
	const authHeader = req.headers['cookie']
	const token = authHeader && authHeader.split('=')[1]
	const decoded = jwt.verify(token, JWT_KEY.secret);
	const userId = decoded.id;
	const admin = decoded.username;

	const first_name = req.body.first_name;
	const last_name = req.body.last_name;
	const email = req.body.email;
	const username = req.body.username;
	const password = req.body.password;
	const pass_confirmation = req.body.pass_confirmation;

	if (password == pass_confirmation) {
		if (password.length >= 8 && password.length <= 16) {
			const hashedPassword = bcrypt.hashSync(password, 10);
			User.create({
				first_name: first_name,
				last_name: last_name,
				email: email,
				username: username,
				password: hashedPassword
			}).then(results => {
				res.redirect('users')
			}).catch(err => { console.log(err) })
		} else {
			return res.sendStatus(400)
		}
	}
	else {
		return res.sendStatus(400);
	}
}

exports.getUpdateUser = (req, res) => {
	if (req.user.username != "admin") {
		return res.sendStatus(401);
	}
	const id = req.params.id;
	console.log(id);
	User.findByPk(id)
		.then(user => {
			return res.json(user);
		})
		.catch(err => {
			console.log(err);
		})
}

exports.postUpdateUser = (req, res) => {
	if (req.user.username != "admin") {
		return res.sendStatus(401);
	}
	const id = req.body.id;
	const updated_first_name = req.body.first_name;
	const updated_last_name = req.body.last_name;
	const updated_email = req.body.email;
	const updated_username = req.body.username;
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

exports.getCourses = (req, res) => {
	if (req.user.username != "admin") {
		return res.sendStatus(401);
	}
	const authHeader = req.headers['cookie']
	const token = authHeader && authHeader.split('=')[1]
	const decoded = jwt.verify(token, JWT_KEY.secret);
	const id = decoded.id;
	const username = decoded.username;
	Course.findAll()
	.then(courses => {
		return res.status(200).json(courses);
	})
	.catch(err => {
		console.log(err);
	})
}

exports.getCreateCourse = (req, res) => {
	if (req.user.username != "admin") {
		return res.sendStatus(401);
	}
	const username = req.user.username;
	return res.sendStatus(200);
}

exports.postCourse = (req, res) => {
	if (req.user.username != "admin") {
		return res.sendStatus(401);
	}

	const authHeader = req.headers['cookie']
	const token = authHeader && authHeader.split('=')[1]
	const decoded = jwt.verify(token, JWT_KEY.secret);
	const userId = decoded.id;
	const admin = decoded.username;

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
		res.redirect('courses')
	}).catch(err => { 
		console.log(err) 
	})
}

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

exports.getEnrollments = (req, res) => {
	if (req.user.username != "admin") {
		return res.sendStatus(401);
	}
	Enrollment.findAll()
	.then(enrollments => {
		return res.json(enrollments);

	})
	.catch(err => { console.log(err) })
}

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
			res.redirect('enrollments')
		}).catch(err => {
			console.log(err)
		})
}

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