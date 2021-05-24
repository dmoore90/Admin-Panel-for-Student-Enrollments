import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Courses extends Component {
	constructor() {
		super();
		this.state = {
			courses: []
		}
	}

	componentDidMount() {
		fetch('http://localhost:3000/courses', {credentials: 'include'})
			.then(res => res.json())
			.then(courses => this.setState({ courses }))
	}

	render() {
		return (
			<div className="App">
				<h1>Courses</h1>
					<div>
				        <ul>
					        <Link to={'./adminHome'}>
					          <li><button variant="raised">AdminHome</button></li>
					        </Link>				                      
				        </ul>
						{this.state.courses.map(course => 
							<li key={course.id}>{ course.course_name } { course.beginning_date } { course.ending_date } { course.instructor }</li>
						)}	
					</div>
			</div>
		);
	}
}

export default Courses;