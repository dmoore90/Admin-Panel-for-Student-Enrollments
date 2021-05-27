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

	render(props) {
		return (
			<div className="App">
				<h1>Update Enrollment</h1>
				<div>
			      <form onSubmit={this.handleSubmit}>
			      	<div><input type="hidden" name="id" value={this.state.id} onChange={this.handleChange} /></div>
			    	<div><label>course_name: <input type="text" name="course_name" value={this.state.course_name} onChange={this.handleChange} /></label></div>
			        <div><label>username: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} /></label></div>
			        <input type="submit" value="Submit" />
			      </form>
				</div>
			</div>
		);
	}
}

export default UpdateEnrollment;