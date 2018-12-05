import React, {Component} from 'react';
import {connect} from 'react-redux';
import {testLog} from '../../actions/testActions';
import {increment} from '../../actions/incAction';
import {decrement} from '../../actions/decAction';

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

  render() {
    return (
      <div>
        {this.testing()}
        <div>
          <button onClick={this.handleClick}>TEST BTN</button>
        </div>
        <h1>{this.props.incDec}</h1>
        <button onClick={this.handleAdd}>+</button>
        <button onClick={this.handleDec}>-</button>
      </div>
    );
  }
}

// these are the props
// test key came from index.js
// state.the reducer name obj from index reducer.initial state from testReducer
const mapStateToProps = (state) => ({
  test: state.test.logArr,
  incDec: state.incDec,
  state,
});
const mapDispatchToProps=(dispatch)=>({
  increment:(args)=>{
    dispatch(increment(args));
  },
  decrement:(args)=>{
    dispatch(decrement(args));
  },
  testLog:(args)=>{
    dispatch(testLog(args));
  }
});
export default connect(
  mapStateToProps,mapDispatchToProps
)(Test);