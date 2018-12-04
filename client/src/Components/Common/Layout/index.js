import React from 'react';
import { Router } from '@reach/router';

import Header from '../../Theme/header';
import Footer from '../../Theme/footer';
import {IndexPage, Locations, Drives, About, Test} from '../../../Pages';

const Layout = () => (
    <div>
      <Header />
      <Router>
        <IndexPage path="/" />
        <Drives path="/drives" />
        <Locations path="/locations" />
        <About path="/about" />
        <Test path="/test" />
      </Router>
      <Footer />
    </div>
);

export default Layout;
