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

// Public Home
exports.getIndex = (req, res, next) => {
	// res.render('index.ejs');
	var list = ["item1", "item2", "item3"];
	// var list = "james";
	res.json(list)
    // res.sendFile(path.join(process.cwd()+'/views/index.ejs'));

}

// Login Section
exports.getAdminLogin = (req, res, next) => {
	// res.render('adminLogin.ejs', {msg: null});
	var list = ["<!admin json test!>"];
	res.json(list)
}

exports.postAdminLogin = (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;

	User.findOne({ where: { username: username } })
		.then(user => {
			if (!user || user.username != "admin") {
				return res.sendStatus(401);
			}
			bcrypt.compare(password, user.password)
				.then(success => {
					if (success) {
			        	const token = jwt.sign({ id: user.dataValues.id, username: user.username }, JWT_KEY.secret, { expiresIn: "4h" });
						res.cookie('auth', token, { httpOnly: true });
						// res.status(200).cookie('auth', token).send();
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

exports.getAdminHome = (req, res) => {
	var username = [req.user.username];
	if (username == "admin") {
		// res.render('adminHome', {page_user: username});
		res.json(username)
	} else {
		res.sendStatus(401);
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

	return res.redirect('adminLogin');
}

// Users Section

exports.getUpdateUser = (req, res) => {
	if (req.user.username != "admin") {
		return res.sendStatus(401);
	}
	res.render('updateUser');
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
			// return res.render('users', { users: users });
			return res.json(users);
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
	res.render('createUser.ejs', {msg: null});
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
			User.findAll({ where: { role: 'NOSUPERUSER'}})
				.then(users=> { 
					return res.render('users', {
						page_user: admin, 
						users: users, 
						msg: "password must be between 8 and 16 characters!" 
					})
				})
		}
	}
	else {
		User.findAll({ where: { role: 'NOSUPERUSER'}})
			.then(users=> { 
				return res.render('createUser', {
					msg: "passwords do not match!" 
				})
			})
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
		// return res.render('courses', { courses: courses });
		return res.json(courses);
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
	res.render('createCourse.ejs', {msg: null});
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
			// if (!course) {
			// 	return res.redirect('/courses');
			// }
			// res.render('updateCourse.ejs', { course: course })
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