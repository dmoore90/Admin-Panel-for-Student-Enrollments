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
			<div className="top-wrapper">
				<div>
					<h1 class="title">Courses</h1>
				</div>
				<div>
			        <div class="list-container">
				        <li><Link to={'./adminHome'}><button variant="raised">AdminHome</button></Link></li>
				        <li><Link to={'./postCourse'}><button variant="raised">CreateCourse</button></Link></li>					                      
			        </div>
			        <div class="list-items">
						{this.state.courses.map(course => 
					        <Link to={`./updateCourse/${course.id}`}>
					          <li key={course.id}>{ course.course_name } { course.beginning_date } { course.ending_date } { course.instructor }</li>
					        </Link>	
						)}
			        </div>	
				</div>
			</div>
		);
	}
}

export default Courses;