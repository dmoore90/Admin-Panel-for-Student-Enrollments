import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home.js';
import List from './pages/List.js';
import AdminLogin from './pages/AdminLogin.js';

class App extends Component {
	render() {
		const App = () => (
			<div>
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route path="/list" component={List}/>
					<Route path="/adminLogin" component={AdminLogin}/>
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