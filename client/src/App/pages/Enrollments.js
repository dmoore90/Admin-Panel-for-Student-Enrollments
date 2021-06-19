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
					<h1>Enrollments</h1>	
				</div>
				<div class="list-container">
			        <li><Link to={'./adminHome'}><button variant="raised">AdminHome</button></Link></li>
			        <li><Link to={'./enroll'}><button variant="raised">New Enrollment</button></Link></li>
				</div>
				<div class="list-items">
					{this.state.enrollments.map(enrollment => 
				        <Link to={`./updateEnrollment/${enrollment.id}`}>
				          <li key={enrollment.id}> { enrollment.course_name } { enrollment.username } </li>
				        </Link>	
					)}
				</div>
			</div>
		);
	}
}

export default Enrollments;