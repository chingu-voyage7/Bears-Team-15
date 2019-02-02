import React from 'react';
import {connect} from 'react-redux';
import {closeModal} from '../../../reduxes/actions/modal_actions';
import {navigate} from '@reach/router';
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
            //TODO: handle error here
        }
    };

    return (
        <div className="modal-form">
            <form className="modal-event" onSubmit={handleUpdateEvent}>
                <h2>New Event</h2>
                <div className="modal-event-field">
                    <label>Title</label>
                    <input name="title" onChange={onChange} required />
                </div>
                <div className="modal-event-field">
                    <label>Organization(optional)</label>
                    <input name="organization" onChange={onChange} />
                </div>
                <div className="modal-event-field">
                    <label>Description</label>
                    <input name="description" onChange={onChange} required />
                </div>
                <div className="modal-event-field">
                    <label>Address</label>
                    <input name="address" onChange={onChange} required />
                </div>
                <div className="modal-event-field">
                    <label>City</label>
                    <input name="city" onChange={onChange} required />
                </div>
                <div className="modal-event-field">
                    <label>State</label>
                    <input name="state" onChange={onChange} required />
                </div>
                <div className="modal-event-field">
                    <label>Zip</label>
                    <input name="zip" onChange={onChange} required />
                </div>
                {/* <div className="modal-event-field">
                    <label>Date</label>
                    <input
                        type="date"
                        name="date"
                        onChange={onChange}
                        required
                    />
                </div> */}
                {/* <div className="modal-event-field">
                    <label>Category</label>
                    <input name="category" onChange={onChange} required />
                </div> */}
                <button>Update</button>
                <button onClick={handleDeleteEvent}>Delete Event</button>
            </form>
        </div>
    );
};

const mapStateToProps = (state) => ({
    state,
});

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(EventEdit);

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    // graphql query
    graphql(updateEvent, {
        name: 'updateThisEvent',
    }),
    graphql(deleteEvent, {
        name: 'deleteThisEvent',
    })
)(withApollo(EventEdit));
