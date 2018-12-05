import React from 'react';
import Header from '../../Theme/header';
import Footer from '../../Theme/footer';


const Layout = ({children}) => (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
);

export default Layout;
