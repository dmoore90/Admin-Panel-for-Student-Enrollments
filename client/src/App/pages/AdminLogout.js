import { Component } from 'react';

class AdminLogout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};

    	this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit() {
		fetch('http://localhost:3000/AdminLogout', {
			method: 'POST',
			withCredentials: true,
			credentials: 'include',
			body: JSON.stringify(this.state),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(res => {
			return this.props.history.push('/')
		})
		.catch(err => console.log(err));
	}

	render() {
		this.handleSubmit();
		return null;
	}
}

export default AdminLogout;