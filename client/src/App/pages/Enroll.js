import React, { Component } from 'react';

class Enroll extends Component {
	constructor(props) {
		super(props);
		this.state = {
			course_name: '',
			username: ''
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
		console.log(this.state);
		fetch('http://localhost:3000/enroll', {
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
				return this.props.history.push('/enrollments')
			} else {
				return this.props.history.push('/enrollments')
			}
		})
		.catch(err => console.log(err));
	}

	render() {
		return (
			<div className="top-wrapper">
				<div>
					<h1 class="title">New Enrollment</h1>
				</div>
				<div class="list-container">
			      <form onSubmit={this.handleSubmit}>
			    	<label>course_name:</label>
			    	<li><input type="text" name="course_name" value={this.state.course_name} onChange={this.handleChange} /></li>
			    	<label>student username:</label> 
			    	<li><input type="text" name="username" value={this.state.username} onChange={this.handleChange} /></li>
			        <input type="submit" value="submit" />
			      </form>
				</div>
			</div>
		);
	}
}

export default Enroll;