import React, {Component} from 'react';
import {connect} from 'react-redux';

const EventEdit = ({eventData}) => {
    console.log(eventData);
    return (
        <div>
            <h1>about bullshit</h1>
        </div>
    );
};

const mapStateToProps = (state) => ({
    state,
});

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventEdit);
