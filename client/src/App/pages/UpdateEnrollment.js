import React, { Component } from 'react';

class UpdateEnrollment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			course_name: '',
			username: ''
		};

    	this.componentDidMount = this.componentDidMount.bind(this);
   		this.handleChange = this.handleChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
    	this.handleDelete = this.handleDelete.bind(this);
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		fetch(`http://localhost:3000/updateEnrollment/${id}`, {credentials: 'include'})
			.then(res => res.json())
			.then(enrollment => { this.setState(enrollment); console.log(enrollment)})
	}

	handleChange(event) {
		const { value, name } = event.target;
		this.setState({ [name]: value })
	}

	handleSubmit(event) {
		event.preventDefault();
		fetch(`http://localhost:3000/updateEnrollment`, {
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
				const error = new Error(res.error);
				throw error;
			}
		})
		.catch(err => console.log(err));
	}

	handleDelete(event) {
		event.preventDefault();
		fetch(`http://localhost:3000/deleteEnrollment`, {
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
				const error = new Error(res.error);
				throw error;
			}
		})
		.catch(err => console.log(err));
	}

	render(props) {
		return (
			<div className="top-wrapper">
				<div>
					<h1 class="title">Update Enrollment</h1>
				</div>
				<div class="list-container">
			      <form onSubmit={this.handleSubmit}>
			      	<li><input type="hidden" name="id" value={this.state.id} onChange={this.handleChange} /></li>
			    	<label>course_name:</label> 
			    	<li><input type="text" name="course_name" value={this.state.course_name} onChange={this.handleChange} /></li>
			        <label>username:</label> 
			        <li><input type="text" name="username" value={this.state.username} onChange={this.handleChange} /></li>
			        <input type="submit" value="Submit" />
			      </form>
				</div>
				<div>
					<h1 class="title">Delete Enrollment</h1>
				</div>
				<div>
			      <form onSubmit={this.handleDelete}>
			      	<input type="hidden" name="id" value={this.state.id} onChange={this.handleChange} />
			        <input type="submit" value="delete" />
			      </form>
				</div>
			</div>
		);
	}
}

export default UpdateEnrollment;