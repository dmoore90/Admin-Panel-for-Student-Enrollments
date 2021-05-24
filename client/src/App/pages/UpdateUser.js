import React, { Component } from 'react';

class UpdateUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			first_name: '',
			last_name: '',
			email: '',
			username: '', 
			password: '',
			pass_confirmation: ''
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
		fetch('http://localhost:3000/postUser', {
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

	render() {
		return (
			<div className="App">
				<h1>Create User</h1>
				<div>
			      <form onSubmit={this.handleSubmit}>
			    	<div><label>first_name: <input type="text" name="first_name" value={this.state.first_name} onChange={this.handleChange} /></label></div>
			    	<div><label>last_name: <input type="text" name="last_name" value={this.state.last_name} onChange={this.handleChange} /></label></div>
			    	<div><label>email: <input type="text" name="email" value={this.state.email} onChange={this.handleChange} /></label></div>
			        <div><label>username: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} /></label></div>
			        <div><label>password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} /></label></div>
					<div><label>Password Confirmation: <input type="password" name="pass_confirmation" value={this.state.pass_confirmation} onChange={this.handleChange} /></label></div>
			        <input type="submit" value="Submit" />
			      </form>
				</div>
			</div>
		);
	}
}

export default CreateUser;