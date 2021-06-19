import React, { Component } from 'react';

class CreateCourse extends Component {
	constructor(props) {
		super(props);
		this.state = {
			course_name: '',
			beginning_date: '',
			ending_date: '',
			instructor: ''
		};
   		this.handleChange = this.handleChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const { value, name } = event.target;
		this.setState({ [name]: value })
	}

	handleSubmit(event) {
		event.preventDefault();
		fetch('http://localhost:3000/postCourse', {
			method: 'POST',
			withCredentials: true,
			credentials: 'include',
			body: JSON.stringify(this.state),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(res => {
			if (res.status === 200) {
				return this.props.history.push('/courses')
			} else {
				const error = new Error(res.error);
				throw error;
			}
		})
		.catch(err => console.log(err));
	}

	render() {
		return (
			<div className="top-wrapper">
				<div>
					<h1 class="title">Create Course</h1>	
				</div>
				<div class="list-container">
			      <form onSubmit={this.handleSubmit}>
			    	<label>course_name:</label>
			    	<li><input type="text" name="course_name" value={this.state.course_name} onChange={this.handleChange} /></li>
			    	<label>beginning_date:</label> 
			    	<li><input type="text" name="beginning_date" value={this.state.beginning_date} onChange={this.handleChange} /></li>
			    	<label>ending_date:</label>
			    	<li><input type="text" name="ending_date" value={this.state.ending_date} onChange={this.handleChange} /></li>
			        <label>instructor:</label>
			        <li><input type="text" name="instructor" value={this.state.instructor} onChange={this.handleChange} /></li>
			        <input type="submit" value="Submit" />
			      </form>
				</div>
			</div>
		);
	}
}

export default CreateCourse;