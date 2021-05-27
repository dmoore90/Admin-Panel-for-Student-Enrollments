import React, { Component } from 'react';

class UserLogin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
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
		fetch('http://localhost:3000/userLogin', {
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
				return this.props.history.push('/userHome')
			} else {
				return this.props.history.push('/')
			}
		})
		.catch(err => console.log(err));
	}

	render() {
		return (
			<div className="App">
				<h1>User Login</h1>
				<div>
			      <form onSubmit={this.handleSubmit}>
			        <div><label>username: <input type="text" name="username" value={this.state.email} onChange={this.handleChange} /></label></div>
			        <div><label>password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} /></label></div>
			        <input type="submit" value="Submit" />
			      </form>
				</div>
			</div>
		);
	}
}

export default UserLogin;