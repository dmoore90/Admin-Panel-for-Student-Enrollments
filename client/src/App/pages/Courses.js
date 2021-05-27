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
			.then((res) => {
				if (res.status === 200) {
					return res.json()
				} else {
					return this.props.history.push('/')
				} 
			})
			.then(courses => {
				this.setState({ courses })
			})
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
					        <Link to={'./postCourse'}>
					          <li><button variant="raised">CreateCourse</button></li>
					        </Link>					                      
				        </ul>
						{this.state.courses.map(course => 
					        <Link to={`./updateCourse/${course.id}`}>
					
					          <li key={course.id}>{ course.course_name } { course.beginning_date } { course.ending_date } { course.instructor }</li>
					        </Link>	
						)}	
					</div>
			</div>
		);
	}
}

export default Courses;