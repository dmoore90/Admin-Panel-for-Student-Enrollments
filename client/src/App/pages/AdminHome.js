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
				<ul>
					<h1 class="title">Admin Home</h1>
{/*					{this.state.list.map(i => 
							<div>Welcome {i}!</div>
						)}*/}
				</ul>	
					<div class="list-container">
				        <ul>
					        <Link to={'./users'}>
					          <li><button variant="raised">Users</button></li>
					        </Link>
					        <Link to={'./courses'}>
					          <li><button variant="raised">Courses</button></li>
					        </Link>
					        <Link to={'./enrollments'}>
					          <li><button variant="raised">Enrollments</button></li>
					        </Link>
					        <Link to={'./adminLogout'}>
					          <li><button variant="raised">AdminLogout</button></li>
					        </Link>						        					                      
				        </ul>
			        </div>
			</div>
		);
	}
}

export default AdminHome;