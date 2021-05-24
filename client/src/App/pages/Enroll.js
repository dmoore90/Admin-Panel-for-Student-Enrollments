import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Enroll extends Component {
	constructor() {
		super();
		this.state = {
			list: []
		}
	}

	componentDidMount() {
		fetch('http://localhost:3000/users', {credentials: 'include'})
			.then(res => res.json())
			.then(list => this.setState({ list }))
	}

	render() {
		return (
			<div className="App">
				<h1>Enroll</h1>
					<div>
						{this.state.list.map(i => 
							<div>{i}</div>
						)}
				        <ul>
					        <Link to={'./adminHome'}>
					          <li><button variant="raised">AdminHome</button></li>
					        </Link>				                      
				        </ul>
					</div>
			</div>
		);
	}
}

export default Enroll;