import React from 'react';
import Header from '../../Theme/header';
import Footer from '../../Theme/footer';
import Modal from '../Modal/modal';
import './main.css'

const Layout = ({children}) => (
    <div>
      <Modal />
      <Header />
      {children}
      <Footer />
    </div>
);

export default Layout;
