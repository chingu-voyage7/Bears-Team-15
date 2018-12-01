import React, {Component} from 'react';
import {connect} from 'react-redux';
import {testLog} from '../actions/testActions';
import Layout from '../Components/Common/Layout';

class Test extends Component {
  handleClick = () => {
    console.log('foo', this.props.test);
    const items = [...this.props.test];
    items.push('yolo');
    console.log(items, 'f');
    console.log(this.props.testLog(items), 'fn');
  };

  testing = () => {
    return this.props.test.map((l, i) => <h1 key={i}>{l}</h1>);
  };

  render() {
    return (
      <Layout>
        {this.testing()}
        <div>
          <button onClick={this.handleClick}>TEST BTN</button>
        </div>
      </Layout>
    );
  }
}

// these are the props
// test key came from index.js
const mapStateToProps = (state) => ({
  test: state.test.logArr,
});

export default connect(
  mapStateToProps,
  {testLog}
)(Test);
