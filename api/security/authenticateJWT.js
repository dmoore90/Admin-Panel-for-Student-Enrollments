const jwt = require('jsonwebtoken');
const JWT_KEY = require('../config/security')
var cookieParser = require('cookie-parser')

const authenticateJWT = (req, res, next) => {
	const authHeader = req.headers['cookie']
	const token = authHeader && authHeader.split('=')[1]
	if (token == null) return res.sendStatus(401)

	jwt.verify(token, JWT_KEY.secret, (err, user) => {
		if (err) return res.sendStatus(403)
		req.user = user

		next()
	})
}

module.exports = authenticateJWT;