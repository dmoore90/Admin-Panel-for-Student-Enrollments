import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home.js';
import AdminLogin from './pages/AdminLogin.js';
import AdminHome from './pages/AdminHome.js';
import Users from './pages/Users.js';
import Courses from './pages/Courses.js';
import Enroll from './pages/Enroll.js';
import Enrollments from './pages/Enrollments.js';
import CreateUser from './pages/CreateUser.js';
import UpdateUser from './pages/UpdateUser.js';
import CreateCourse from './pages/CreateCourse.js';
import UpdateCourse from './pages/UpdateCourse.js';
import AdminLogout from './pages/AdminLogout.js';
import UpdateEnrollment from './pages/UpdateEnrollment.js';

class App extends Component {
	render() {
		const App = () => (
			<div>
				<Switch>
					<Route exact path="/" component={Home}/>
					
					<Route path="/adminLogin" component={AdminLogin}/>
					<Route path="/adminLogout" component={AdminLogout}/>

					<Route path="/adminHome" component={AdminHome}/>
					<Route path="/users" component={Users}/>
					<Route path="/courses" component={Courses}/>

					<Route path="/enroll" component={Enroll}/>
					<Route path="/enrollments" component={Enrollments}/>
					<Route path="/updateEnrollment/:id" component={UpdateEnrollment}/>

					<Route path="/postUser" component={CreateUser}/>
					<Route path="/updateUser/:id" component={UpdateUser}/>

					<Route path="/postCourse" component={CreateCourse}/>
					<Route path="/updateCourse/:id" component={UpdateCourse}/>
				</Switch>
			</div>
		)
		return (
			<Switch>
				<App />
			</Switch>
		);
	}
}

export default App;