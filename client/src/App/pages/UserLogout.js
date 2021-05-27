import { Component } from 'react';

class UserLogout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};

    	this.handleSubmit = this.handleSubmit.bind(this);

	}

	handleSubmit() {
		fetch('http://localhost:3000/UserLogout', {
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
				this.props.history.push('/')
			} else {
				const error = new Error(res.error);
				throw error;
			}
		})
		.catch(err => console.log(err));
	}

	render() {
		this.handleSubmit();
		return null;
	}
}

export default UserLogout;