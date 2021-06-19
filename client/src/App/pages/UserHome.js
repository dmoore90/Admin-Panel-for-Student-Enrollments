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
			.then((res) => { 
				if (res.status === 200) {
					return res.json()
				} else {
					return this.props.history.push('/')
				} 
			})
			.then(enrollments => this.setState({ enrollments }))
	}

	render() {
		return (
			<div className="top-wrapper">
				<div>
					<h1 class="title">User Home</h1>
				</div>
				<div>
			        <li style={{listStyleType: "none"}}><Link to={'./userLogout'}><button variant="raised">Logout</button></Link></li>
				</div>
				<div>
					<h1 class="title">Enrollments</h1>
				</div>        
				<div class="list-items">
					{this.state.enrollments.map(enrollments => 
						<li key={enrollments.id}>{ enrollments.course_name } </li>
					)}
				</div>								        					                     
			</div>
		);
	}
}

export default UserHome;