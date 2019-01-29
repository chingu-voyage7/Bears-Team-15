import React, {Component} from 'react';
import {connect} from 'react-redux';

import {closeModal} from '../../../reduxes/actions/modal_actions';
import {Redirect, navigate} from '@reach/router';
import {graphql, withApollo} from 'react-apollo';
import {compose} from 'redux';
import {
    updateEvent,
    getEventById,
    deleteEvent,
    getUser,
} from '../../../util/graphQLQuery';

const EventEdit = ({
    eventData,
    state,
    dispatch,
    updateThisEvent,
    client,
    deleteThisEvent,
}) => {
    let form = {
        title: '',
        organization: '',
        description: '',
        Address: '',
        city: '',
        state: '',
        zip: '',
        // category: '',
    };

    const onChange = (event) => {
        form[event.target.name] = event.target.value;
    };

    const handleUpdateEvent = async (event) => {
        console.log(client.cache);
        event.preventDefault();
        try {
            updateThisEvent({
                variables: {
                    id: eventData.id,
                    title: form.title,
                    organization: form.organization,
                    description: form.description,
                    address: form.address,
                    city: form.city,
                    state: form.state,
                    zip: parseInt(form.zip),
                    // organizer: form.organizer,
                    // category: form.category,
                },
                refetchQueries: [
                    {
                        query: getEventById,
                        variables: {id: eventData.id},
                    },
                ],
            });
            dispatch(closeModal());
        } catch (error) {
            //TODO: handle error here
            console.log(error);
        }
    };

    const handleDeleteEvent = (event) => {
        const {id} = state.currentUser;
        event.preventDefault();
        try {
            deleteThisEvent({
                variables: {
                    eventId: eventData.id,
                    userId: id,
                },
                refetchQueries: [
                    {
                        query: getUser,
                        variables: {id: id},
                    },
                ],
            });
            dispatch(closeModal());
            navigate('/profile');
        } catch (error) {
            console.log(error);
            //TODO: handle error here
        }
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
