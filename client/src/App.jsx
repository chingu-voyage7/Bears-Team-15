import React, {Component} from 'react';
import {Provider} from 'react-redux';

class App extends Component {
  render() {
    return (
      <Provider>
        <main>
          <div>
            <h1>OUR APP</h1>
          </div>
        </main>
      </Provider>
    );
  }
}

export default App;
