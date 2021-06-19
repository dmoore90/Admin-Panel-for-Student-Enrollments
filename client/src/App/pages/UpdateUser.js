import React, { Component } from 'react';

class UpdateUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			first_name: '',
			last_name: '',
			email: '',
			username: ''
		};

    	this.componentDidMount = this.componentDidMount.bind(this);
   		this.handleChange = this.handleChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
    	this.handleDelete = this.handleDelete.bind(this);
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		fetch(`http://localhost:3000/updateUser/${id}`, {credentials: 'include'})
			.then(res => res.json())
			.then(user => { this.setState(user); console.log(user)})
	}

	handleChange(event) {
		const { value, name } = event.target;
		this.setState({ [name]: value })
	}

	handleSubmit(event) {
		event.preventDefault();
		fetch(`http://localhost:3000/updateUser`, {
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
				return this.props.history.push('/users')
			} else {
				const error = new Error(res.error);
				throw error;
			}
		})
		.catch(err => console.log(err));
	}

	handleDelete(event) {
		event.preventDefault();
		fetch(`http://localhost:3000/deleteUser`, {
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
				return this.props.history.push('/users')
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
					<h1 class="title">Update User</h1>
				</div>
				<div class="list-container">
			      <form onSubmit={this.handleSubmit}>
			      	<div><input type="hidden" name="id" value={this.state.id} onChange={this.handleChange} /></div>
			    	<label>first_name:</label> 
			    	<li><input type="text" name="first_name" value={this.state.first_name} onChange={this.handleChange} /></li>
			    	<label>last_name:</label> 
			    	<li><input type="text" name="last_name" value={this.state.last_name} onChange={this.handleChange} /></li>
			    	<label>email:</label> 
			    	<li><input type="text" name="email" value={this.state.email} onChange={this.handleChange} /></li>
			        <label>username:</label> 
			        <li><input type="text" name="username" value={this.state.username} onChange={this.handleChange} /></li>
			        <input type="submit" value="Submit" />
			      </form>					
				</div>
				<h1 class="title">Delete User</h1>
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

export default UpdateUser;