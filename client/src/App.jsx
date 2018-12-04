import React from 'react';
import { Provider } from 'react-redux';

import Layout from './Components/Common/Layout/index';

const App = ({ store }) => (
  <Provider store={store}>
      <Layout />
  </Provider>
);

export default App;
