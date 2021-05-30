const express = require('express');
const controller = require('../controllers/admin_controller');
const adminRouter = express.Router();
const authenticateJWT = require('../security/authenticateJWT');

// Admin Login
// adminRouter.get('/', controller.getIndex);
// adminRouter.get('/adminLogin', controller.getAdminLogin);
adminRouter.post('/adminLogin', controller.postAdminLogin);
adminRouter.post('/adminLogout', authenticateJWT, controller.postAdminLogout);
adminRouter.get('/adminHome', authenticateJWT, controller.getAdminHome);

// Users Section
adminRouter.get('/users', authenticateJWT, controller.getUsers);
// adminRouter.get('/createUser', authenticateJWT, controller.getCreateUser);
adminRouter.post('/postUser', authenticateJWT, controller.postUser);
adminRouter.get('/updateUser/:id', authenticateJWT, controller.getUpdateUser);
adminRouter.post('/updateUser', authenticateJWT, controller.postUpdateUser);
adminRouter.post('/deleteUser', authenticateJWT, controller.postDeleteUser);

// Courses Section
adminRouter.get('/courses', authenticateJWT, controller.getCourses);
adminRouter.get('/createCourse', authenticateJWT, controller.getCreateCourse);
adminRouter.post('/postCourse', authenticateJWT, controller.postCourse);
adminRouter.get('/updateCourse/:id', authenticateJWT, controller.getUpdateCourse);
adminRouter.post('/updateCourse', authenticateJWT, controller.postUpdateCourse);
adminRouter.post('/deleteCourse', authenticateJWT, controller.deleteCourse);

// Enrollment Section
adminRouter.get('/updateEnrollment/:id', authenticateJWT, controller.getUpdateEnrollment);
adminRouter.post('/updateEnrollment', authenticateJWT, controller.postUpdateEnrollment);
adminRouter.post('/enroll', authenticateJWT, controller.postEnrollment);
adminRouter.get('/enrollments', authenticateJWT, controller.getEnrollments);
adminRouter.post('/deleteEnrollment', authenticateJWT, controller.deleteEnrollment);

module.exports = adminRouter;