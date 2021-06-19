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
			<div className="top-wrapper">
				<div>
					<h1 class="title">Users</h1>
				</div>
				<div class="list-container">
				    <li><Link to={'./adminHome'}><button variant="raised">AdminHome</button></Link></li>
				    <li><Link to={'./postUser'}><button variant="raised">CreateUser</button></Link></li>					        				                      
				</div>
				<div class="list-items">
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