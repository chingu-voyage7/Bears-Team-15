// ! imported dependencies
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {graphql} from 'react-apollo';
// ! imported actions
import {
  testLog,
  increment,
  decrement,
  getAllUsers,
} from '../../reduxes/actions/rootAction';
// ! imported queries
import {testUserQuery} from '../../util/graphQLQuery';

class Test extends Component {
  handleClick = () => {
    const items = [...this.props.test];
    items.push('yolo');
    this.props.testLog(items);
  };

  testing = () => {
    return this.props.test.map((l, i) => <h1 key={i}>{l}</h1>);
  };

  handleAdd = () => {
    console.log(this.props.incDec, 's');
    const num = this.props.incDec;
    this.props.increment(num);
  };

  handleDec = () => {
    // console.log(this.props.incDec);
    const num = this.props.incDec;
    this.props.decrement(num);
  };

  getAllUsers = () => {
    const {userGetAll} = this.props.data;
    return userGetAll.map((u, i) => (
      <div key={u.id}>
        <div>id : {u.id}</div>
        <div>name: {u.name}</div>
      </div>
    ));
  };

  handleGrabUsers = () => {
    console.log(this.props.data);
    const {userGetAll} = this.props.data;
    console.log('fn to get user!', this.props.getAllUsers(userGetAll));
  };

  render() {
    const {loading} = this.props.data;
    return (
      <div>
        {this.testing()}
        <div>
          <button onClick={this.handleClick}>TEST BTN</button>
        </div>
        <h1>{this.props.incDec}</h1>
        <button onClick={this.handleAdd}>+</button>
        <button onClick={this.handleDec}>-</button>
        <div>
          {!loading ? this.getAllUsers() : ''}
          <button onClick={this.handleGrabUsers}>Users</button>
        </div>
      </div>
    );
  }
}

// these are the props
// test key came from rootReducer.js
// state.the reducer name obj from index reducer.initial state from testReducer
const mapStateToProps = (state) => ({
  test: state.test.logArr,
  incDec: state.incDec,
  state,
});

const mapDispatchToProps = (dispatch) => ({
  increment: (args) => {
    dispatch(increment(args));
  },
  decrement: (args) => {
    dispatch(decrement(args));
  },
  testLog: (args) => {
    dispatch(testLog(args));
  },
  getAllUsers: (args) => {
    dispatch(getAllUsers(args));
  },
});
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Test);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  // graphql query
  graphql(testUserQuery)
)(Test);
