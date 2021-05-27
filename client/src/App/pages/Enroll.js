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
			<div className="App">
				<h1>New Enrollment</h1>
				<div>
			      <form onSubmit={this.handleSubmit}>
			    	<div><label>course_name: <input type="text" name="course_name" value={this.state.course_name} onChange={this.handleChange} /></label></div>
			    	<div><label>username: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} /></label></div>
			        <input type="submit" value="submit" />
			      </form>
				</div>
			</div>
		);
	}
}

export default Enroll;