import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Users extends Component {
	constructor() {
		super();
		this.state = {
			users: []
		}
	}

	componentDidMount() {
		fetch('http://localhost:3000/users', {credentials: 'include'})
			.then((res) => {
				if (res.status === 200) {
					return res.json()
				} else {
					return this.props.history.push('/')
				} 
			})
			.then(users => this.setState({ users }))
	}

	render() {
		return (
			<div className="App">
				<h1>Users</h1>
					<div>
				        <ul>
					        <Link to={'./adminHome'}>
					          <li><button variant="raised">AdminHome</button></li>
					        </Link>
					        <Link to={'./postUser'}>
					          <li><button variant="raised">CreateUser</button></li>
					        </Link>					        				                      
				        </ul>
						{this.state.users.map(user => 
					        <Link to={`./updateUser/${user.id}`}>
					          <li key={user.id}>{ user.first_name } { user.last_name } { user.email } { user.username }</li>
					        </Link>	
						)}				        
					</div>
			</div>
		);
	}
}

export default Users;