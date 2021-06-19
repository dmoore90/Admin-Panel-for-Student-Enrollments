import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../static/styles.css'

class Home extends Component {

  render() {
    return (
      <div class="top-wrapper">
        <div>
          <h1 class="title">Home</h1>
        </div>
        <div class="list-container">
            <li><Link to={'./adminLogin'}><button>Admin Login</button></Link></li>
            <li><Link to={'./userLogin'}><button>User Login</button></Link></li>           
        </div>
      </div>      
    );
  }
}

export default Home;