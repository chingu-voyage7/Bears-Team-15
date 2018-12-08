import React from 'react';
import {Link} from '@reach/router';

const Header = () => (
  <div>
    <h1>Header</h1>
    <nav>
      <Link to="/">Home</Link>
      <Link to="drives">Drives</Link>
      <Link to="loacations">Locations</Link>
      <Link to="about">About</Link>
      <Link to="test">Test</Link>
      <Link to="login">Login</Link>
    </nav>
  </div>
);

export default Header;
