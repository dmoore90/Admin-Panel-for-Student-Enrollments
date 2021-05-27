import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

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
import UserLogin from './pages/UserLogin.js';
import UserHome from './pages/UserHome.js';
import UserLogout from './pages/UserLogout.js';

import Auth from './Auth.js';

class App extends Component {
	render() {
		const App = () => (
			<div>
				<Switch>
					<Route exact path="/" component={Home}/>
					
					<Route path="/adminLogin" component={AdminLogin}/>
					<PrivateRoute path="/adminLogout" component={AdminLogout}/>

					<PrivateRoute path="/adminHome" component={AdminHome}/>
					{/*<Route path="/adminHome" component={AdminHome}/>*/}
					<PrivateRoute path="/users" component={Users}/>
					<PrivateRoute path="/courses" component={Courses}/>

					<PrivateRoute path="/enroll" component={Enroll}/>
					<PrivateRoute path="/enrollments" component={Enrollments}/>
					<PrivateRoute path="/updateEnrollment/:id" component={UpdateEnrollment}/>

					<PrivateRoute path="/postUser" component={CreateUser}/>
					<PrivateRoute path="/updateUser/:id" component={UpdateUser}/>

					<PrivateRoute path="/postCourse" component={CreateCourse}/>
					<PrivateRoute path="/updateCourse/:id" component={UpdateCourse}/>

					<Route path="/userLogin" component={UserLogin}/>
					<PrivateRoute path="/userHome" component={UserHome}/>
					<PrivateRoute path="/userLogout" component={UserLogout}/>
				</Switch>
			</div>
		)
		const PrivateRoute = ({ component: Component, ...rest }) => (
				<Route {...rest} render={props => Auth.getAuth() ? ( <Component {...props} /> ) : ( <Redirect to={{ pathname: "/" }} /> ) } />
			);
		return (
			<Switch>
				<App />
			</Switch>
		);
	}
}

export default App;