import React from 'react';
import Header from '../../Theme/header';
import Footer from '../../Theme/footer';
import {Provider} from 'react-redux';
import store from '../../../store/store';

const Layout = ({children}) => (
  <Provider store={store}>
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  </Provider>
);

export default Layout;
