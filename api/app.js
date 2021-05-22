const express = require('express');
const app = express();
const mysql = require('mysql2');
const adminRoutes = require('./routes/admin_routes');
const userRoutes = require('./routes/user_routes');
const db = require('./db/connection');
const bodyParser = require('body-parser');
const adminController = require('./controllers/admin_controller');
const userController = require('./controllers/user_controller');
var load = require('express-load');
const cors = require('cors');

const user = require('./models/User');



app.set('view engine', 'ejs');

app.use(cors( {origin: true, credentials: true} ));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(adminRoutes);
app.use(userRoutes);

const port = 3000;
app.listen(port);
console.log(`listening on port ${port}`);
module.exports = app;