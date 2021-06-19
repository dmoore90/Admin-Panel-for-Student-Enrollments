# Express Auth REST API with REACTJS
## A REST API with ExpressJS for backend and ReactJS for front end. Implements JWT Authentication, RESTful resources, and Testing.
### Libraries Used
- Express
- MySQL
- JsonWebToken
- Sequelize
- ReactJS
- Mocha, Chai, Supertest
- docker
- docker-compose
### Getting Started
This app requires NodeJS, ReactJS, MySQL database with database carna_db, user privileges for all and credentials 'user', 'pass'
Clone this repository and install dependencies.
- download project
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
