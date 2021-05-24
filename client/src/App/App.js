import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home.js';
import AdminLogin from './pages/AdminLogin.js';
import AdminHome from './pages/AdminHome.js';
import Users from './pages/Users.js';
import Courses from './pages/Courses.js';
import Enroll from './pages/Enroll.js';
import Enrollments from './pages/Enrollments.js';

class App extends Component {
	render() {
		const App = () => (
			<div>
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route path="/adminLogin" component={AdminLogin}/>
					<Route path="/adminHome" component={AdminHome}/>
					<Route path="/users" component={Users}/>
					<Route path="/courses" component={Courses}/>
					<Route path="/enroll" component={Enroll}/>
					<Route path="/enrollments" component={Enrollments}/>
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