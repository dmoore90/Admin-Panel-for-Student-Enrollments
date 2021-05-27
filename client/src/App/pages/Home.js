import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {

  render() {
    return (
      <div>
        <h1>Home</h1>
        <ul>
        <Link to={'./adminLogin'}>
          <li><button variant="raised">Admin Login</button></li>
        </Link>
        <Link to={'./userLogin'}>
          <li><button variant="raised">User Login</button></li>
        </Link>              
        </ul>
      </div>      
    );
  }
}

export default Home;