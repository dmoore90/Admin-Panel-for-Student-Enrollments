import React, { Component } from 'react';

class AdminLogin extends Component {
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
		this.setState({ 
			[name]: value
		})
	}

	handleSubmit(event) {
		event.preventDefault();
		fetch('http://localhost:3000/adminLogin', {
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
				this.props.history.push('/List')
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
				<h1>Admin Login</h1>
				<div>
			      <form onSubmit={this.handleSubmit}>
			        <label>username: <input type="text" name="username" value={this.state.email} onChange={this.handleChange} /></label>
			        <label>password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} /></label>
			        <input type="submit" value="Submit" />
			      </form>
				</div>
			</div>
		);
	}
}

export default AdminLogin;