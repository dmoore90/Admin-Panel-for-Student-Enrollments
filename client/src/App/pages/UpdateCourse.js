import React, { Component } from 'react';

class UpdateCourse extends Component {
	constructor(props) {
		super(props);
		this.state = {
			course_name: '',
			beginning_date: '',
			ending_date: '',
			instructor: ''
		};

    	this.componentDidMount = this.componentDidMount.bind(this);
   		this.handleChange = this.handleChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
    	this.handleDelete = this.handleDelete.bind(this);
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		fetch(`http://localhost:3000/updateCourse/${id}`, {credentials: 'include'})
			.then(res => res.json())
			.then(course => { this.setState(course) })
	}

	handleChange(event) {
		const { value, name } = event.target;
		this.setState({ [name]: value })
	}

	handleSubmit(event) {
		event.preventDefault();
		fetch(`http://localhost:3000/updateCourse`, {
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
				return this.props.history.push('/courses')
			}
		})
		.catch(err => console.log(err));
	}

	handleDelete(event) {
		event.preventDefault();
		fetch(`http://localhost:3000/deleteCourse`, {
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

	render(props) {
		return (
			<div className="top-wrapper">
				<div>
					<h1 class="title">Update Course</h1>
				</div>
				<div class="list-container">
			      <form onSubmit={this.handleSubmit}>
			      	<li><input type="hidden" name="id" value={this.state.id} onChange={this.handleChange} /></li>
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
				<div>
					<h1 class="title">Delete Course</h1>
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

export default UpdateCourse;