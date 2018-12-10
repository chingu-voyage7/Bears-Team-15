import React from 'react'
import { Link } from '@reach/router';

const Header = () => (
    <div className="header">
  		<h1 className="logo">ARC</h1>
      <nav>
        {/* <Link to="/">Home</Link>{"  "}
        <Link to="drives">Drives</Link>{"  "}
        <Link to="loacations">Locations</Link>{"  "}
        <Link to="about">About</Link>{"  "}
        <Link to="test">Test</Link> */}
        <Link to="/">Sign Up</Link>{" "}
        <Link to="/">Login</Link>{" "}
        <Link to="/">Getting Started</Link>
      </nav>
  	</div>
)

export default Header
