# Express Auth REST API with REACTJS
## A REST API with ExpressJS for backend and ReactJS for front end. Implements JWT Authentication, RESTful resources, and Testing.
### Libraries Used
- Express
- MySQL
- JsonWebToken
- Sequelize
- ReactJS
- Mocha, Chai, Supertest
### Getting Started
This app requires NodeJS, ReactJS, MySQL database with database carna_db, user credentials 'user', 'pass'
Clone this repository and install dependencies.
- $ `git clone git@github.com:dmoore90/carna.git`
- $ `cd carna/api`
- $ `npm install`
- $ `npx sequelize-cli db:migrate`
- $ `cd carna/client`
- $ `npm install`
### Run client and api with nodemon
- $ `cd carna/api`
- $ `npm start`
- $ `cd carna/client`
- $ `npm start`
### Run Tests
- $ `npm test`
## Summary of App
Express/React API to demonstrate a REST API that implements user authentication using JWT on the backend and ReactJS for frontend. The App allows for a hardcoded use 'admin' to login in and create non super users, courses, and enrollments. The second part of the app allows for the newly created users to login into their respective profile pages and view the courses that they are enrolled in.
### Context on decisions and framework choices:
I have used NodeJS with ExpressJS for REST APIs before but ReactJS as a frontend was somewhat new and a learning experience. Implementing JWT for authentication was also a new experience for me as I have never used JWT before. My authentication experience was with database session storage. My Testing is using Mocha, Chai, and Supertest which is also new for me and tests are written for backend controllers. I have separated my express routes from the actual controllers for clarity using module.exports. 
### Areas for improvements:
Further testing can be added for database testing, routes, and ReactJS frontend functions. The enrollments table needs form validation for frontend and backend submission. The database is not effectively configured with realationships and will give way to redundency when users will be signed up with multiple courses. The create enrollments section does not check for whether a course or user is valid in the database again giving way to redundencies and errors. 
