import React from 'react';
import Header from '../../Theme/header.jsx';
import Footer from '../../Theme/footer.jsx';
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
