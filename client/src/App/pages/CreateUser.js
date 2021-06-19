import React, { Component } from 'react';

class CreateUser extends Component {
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
				return this.props.history.push('/users')
			}
		})
		.catch(err => console.log(err));
	}

	render() {
		return (
			<div className="top-wrapper">
			<ul>
				<h1 class="title">Create User</h1>
			</ul>
				<div class="list-container">
			      <form onSubmit={this.handleSubmit}>
			      	<li><label>first_name:</label></li>
			    	<li><div><input type="text" name="first_name" value={this.state.first_name} onChange={this.handleChange} /></div></li>
			    	<li><label>last_name:</label></li>
			    	<li><div><input type="text" name="last_name" value={this.state.last_name} onChange={this.handleChange} /></div></li>
			    	<li><label>email:</label></li>
			    	<li><div><input type="text" name="email" value={this.state.email} onChange={this.handleChange} /></div></li>
			    	<li><label>username</label></li>
			        <li><div><input type="text" name="username" value={this.state.username} onChange={this.handleChange} /></div></li>
			        <li><label>password:</label></li>
			        <li><div><input type="password" name="password" value={this.state.password} onChange={this.handleChange} /></div></li>
					<li><label>Password Confirmation:</label></li>
					<li><div><input type="password" name="pass_confirmation" value={this.state.pass_confirmation} onChange={this.handleChange} /></div></li>
			        <input type="submit" value="Submit" />
			      </form>
				</div>
			</div>
		);
	}
}

export default CreateUser;