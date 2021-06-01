const express = require('express');
const controller = require('../controllers/user_controller');
const userRoutes = express.Router();
const authenticateJWT = require('../security/authenticateJWT');

// User Routes
userRoutes.post('/userLogin', controller.postUserLogin);
userRoutes.post('/userLogout', authenticateJWT, controller.postUserLogout);
userRoutes.get('/userHome', authenticateJWT, controller.getUserHome);

module.exports = userRoutes;