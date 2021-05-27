import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserHome extends Component {
	constructor() {
		super();
		this.state = {
			enrollments: []
		}
	}

	componentDidMount() {
		fetch('http://localhost:3000/userHome', {credentials: 'include'})
			.then(res => res.json())
			.then(enrollments => this.setState({ enrollments }))
	}

	render() {
		return (
			<div className="App">
				<h1>User Home</h1>
					<div>
				        <ul>
					        <Link to={'./userLogout'}>
								<p><button variant="raised">Logout</button></p>
					        </Link>
					        
					        <h1>Enrollments</h1>
    						{this.state.enrollments.map(enrollments => 
								<li key={enrollments.id}>{ enrollments.course_name } </li>
							)}						        					                      
				        </ul>
					</div>
			</div>
		);
	}
}

export default UserHome;