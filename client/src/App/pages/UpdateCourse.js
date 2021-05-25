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
				const error = new Error(res.error);
				throw error;
			}
		})
		.catch(err => console.log(err));
	}

	render(props) {
		return (
			<div className="App">
				<h1>Update Course</h1>
				<div>
			      <form onSubmit={this.handleSubmit}>
			      	<div><input type="hidden" name="id" value={this.state.id} onChange={this.handleChange} /></div>
			    	<div><label>course_name: <input type="text" name="course_name" value={this.state.course_name} onChange={this.handleChange} /></label></div>
			    	<div><label>beginning_date: <input type="text" name="beginning_date" value={this.state.beginning_date} onChange={this.handleChange} /></label></div>
			    	<div><label>ending_date: <input type="text" name="ending_date" value={this.state.ending_date} onChange={this.handleChange} /></label></div>
			        <div><label>instructor: <input type="text" name="instructor" value={this.state.instructor} onChange={this.handleChange} /></label></div>
			        <input type="submit" value="Submit" />
			      </form>
				</div>
			</div>
		);
	}
}

export default UpdateCourse;