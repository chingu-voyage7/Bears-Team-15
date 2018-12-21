import React from 'react';
import Header from '../../Theme/header';
import Footer from '../../Theme/footer';
import Modal from '../Modal/Modal';
import './main.css'

const Layout = ({ children }) => (
  <div className='Layout-container'>
    <Modal />
    <Header />
    {children}
    <Footer />
  </div>
);

export default Layout;
