import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Enrollments extends Component {
	constructor() {
		super();
		this.state = {
			enrollments: []
		}
	}

	componentDidMount() {
		fetch('http://localhost:3000/enrollments', {credentials: 'include'})
			.then(res => res.json())
			.then(enrollments => this.setState({ enrollments }))
	}

	render() {
		return (
			<div className="App">
				<h1>Enrollments</h1>
					<div>
				        <ul>
					        <Link to={'./adminHome'}>
					          <li><button variant="raised">AdminHome</button></li>
					        </Link>				                      
				        </ul>
						{this.state.enrollments.map(enrollment => 
							<li key={enrollment.id}>{ enrollment.course_name } { enrollment.student_name } { enrollment.username } </li>
						)}	
					</div>
			</div>
		);
	}
}

export default Enrollments;