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

## Technical Questions:
- Q: What libraries did you add to the frontend? What are they used for?
- A: Frontend uses react for components, react-dom for rendering, and react-router-dom for react routes.
- Q: What's the command to start the application locally?
- A: After installing the app, react and express will be started by running `npm start` in both client and api directories.
- Q: How long did you spend on the coding project? What would you add to your solution if you had more time? If you didn't spend much time on the coding project, then use this as an opportunity to explain what you would add.
- A: This app took me 3 weeks to complete due to the learning curves I had to go through. If I spent more time on it, I would add database relationships, user privileges assignments, better form and database validations, additional testing and frontend end styling.
- Q: What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.
- A: One of the useful features of JavaScript is its use for server compling with NodeJS. This allows for one of the useful package management systems NPM which allows multiple tool and modules for efficient web development like when using Package.json. Packages can be installed and linked together to be used in middle ware for instance in the case of the 'app.js' of this api. The code `app.use(bodyParser.json())` allows for the use of the package 'body-parser' to be implemented in the app to parse json data from request bodies which is crucial when handling requests and posts from front end to backend. 
- Q: How would you track down a performance issue in production? Have you ever had to do this?
- A: Tackling performance issues would be run with checking CPU and memory usage. Debuggin code and isolating sections as a part of a methodical step helps in testing sections step by step to check for any errors, bugs, and lack of effienciencies. I have had to do this when check for lags in code or memory leacks. 
