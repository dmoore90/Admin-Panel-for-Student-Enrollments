import React, { Component } from 'react';

class List extends Component {
	constructor() {
		super();
		this.state = {
			list: []
		}
	}

	componentDidMount() {
		fetch('http://localhost:3000')
			.then(res => res.json())
			.then(list => this.setState({ list }))
	}

	render() {
		return (
			<div className="App">
				<h1>List of Items</h1>
					<div>
						{this.state.list.map(i => 
							<div>{i}</div>
						)}
					</div>
			</div>
		);
	}
}

export default List;