import React from 'react';
import Header from '../../Theme/header';
import Footer from '../../Theme/footer';
import './main.css'

const Layout = ({children}) => (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
);

export default Layout;
