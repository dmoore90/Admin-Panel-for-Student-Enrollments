import React, { Component } from 'react';

class AdminHome extends Component {
	constructor() {
		super();
		this.state = {
			list: []
		}
	}

	componentDidMount() {
		fetch('http://localhost:3000/adminHome', {credentials: 'include'})
			.then(res => res.json())
			.then(list => this.setState({ list }))
	}

	render() {
		return (
			<div className="App">
				<h1>Admin Home</h1>
					<div>
						{this.state.list.map(i => 
							<div>{i}</div>
						)}
					</div>
			</div>
		);
	}
}

export default AdminHome;