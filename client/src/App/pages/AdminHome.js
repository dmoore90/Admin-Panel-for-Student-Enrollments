import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../static/styles.css'

class AdminHome extends Component {
	constructor() {
		super();
		this.state = {
			list: []
		}
	}

	componentDidMount() {
		fetch('http://localhost:3000/adminHome', {credentials: 'include'})
			.then((res) => { 
				if (res.status === 200) {
					return res.json()
				} else {
					return this.props.history.push('/')
				} 
			})
			.then(list => this.setState({ list }))
	}

	render() {
		return (
			<div className="top-wrapper">
				<div>
					<h1 class="title">Admin Home</h1>
				</div>
				<div class="list-container">
			        <li><Link to={'./users'}><button variant="raised">Users</button></Link></li>
			        <li><Link to={'./courses'}><button variant="raised">Courses</button></Link></li>
			        <li><Link to={'./enrollments'}><button variant="raised">Enrollments</button></Link></li>
			        <li><Link to={'./adminLogout'}><button variant="raised">AdminLogout</button></Link></li>
		        </div>
			</div>
		);
	}
}

export default AdminHome;