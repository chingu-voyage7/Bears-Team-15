import React, {Component} from 'react';
import {connect} from 'react-redux';
import {testLog} from '../../actions/testActions';
import {increment} from '../../actions/incAction';
import {decrement} from '../../actions/decAction';
import {getAllUsers} from '../../actions/userGrabAction';
import {compose} from 'redux';
// ! export gql for querying
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';

// ! this is how you query
// ! export this inside the graphql
const testUserQuery = gql`
  {
    userGetAll {
      name
      id
    }
  }
`;

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

  // getAllUsers = () => {
  //   const {userGetAll} = this.props.data;
  //   return userGetAll.map((u, i) => (
  //     <div key={u.id}>
  //       <div>id : {u.id}</div>
  //       <div>name: {u.name}</div>
  //     </div>
  //   ));
  // };

  handleGrabUsers = () => {
    const {userGetAll} = this.props.data;
    const clone = [...userGetAll];
    console.log(this.props);
    // console.log(this.props.allUsers, 'ff');
    this.props.getAllUsers(clone);
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
          {/* {!loading ? this.getAllUsers() : ''} */}
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
  allUsers: state.allUsers,
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

// ! using compose to export redux and graphql
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  // graphql query
  graphql(testUserQuery)
)(Test);
