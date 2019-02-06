import React from 'react';
import {connect} from 'react-redux';
import {closeModal} from '../../../reduxes/actions/modal_actions';
import {navigate} from '@reach/router';
import {graphql, withApollo} from 'react-apollo';
import {compose} from 'redux';
import Calendar from 'react-calendar';
import {
    updateEvent,
    getEventById,
    deleteEvent,
    getUser,
} from '../../../util/graphQLQuery';

import '../Forms/forms.scss';

const EventEdit = ({
    eventData,
    state,
    dispatch,
    updateThisEvent,
    deleteThisEvent,
}) => {
    const form = {
        title: '',
        organization: '',
        description: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        category: '',
        time: '',
        date: new Date(),
    };

    /**
     * updates changes onn the form
     * @param {OBJECT} event
     */
    const onChange = (event) => {
        form[event.target.name] = event.target.value;
    };

    /**
     * this will check if form has values
     */
    const emptyStringChecker = () => {
        const {location} = eventData;

        // grabbing all keys from the form turn into array
        const arrKeys = Object.keys(form);
        // grabbing all keys from the location turn into array
        const arrLoc = Object.keys(location);

        //change empty form data
        arrKeys.forEach((key) =>
            !form[key] ? (form[key] = eventData[key]) : ''
        );

        //change empty location data
        arrLoc.forEach((key) =>
            !form[key] ? (form[key] = eventData.location[key]) : ''
        );

        //date separated because of different format
        form.date = new Date();
    };

    /**
     * this function will called everyq uery
     * @param {GQLQUERY} gqlQuery
     * @param {OBJECT} variablesAndRefetch
     */
    const gqlQuery = (gqlQuery, variablesAndRefetch) => {
        emptyStringChecker();
        const {variables, refetchQueries} = variablesAndRefetch;
        // try {
        //     gqlQuery({
        //         variables,
        //         refetchQueries,
        //     });
        // } catch (error) {
        //     //TODO: handle error here
        //     return error;
        // }
    };

    /**
     * Updates event
     * @param {OBJECT} event
     */
    const handleUpdateSubmit = (event) => {
        event.preventDefault();
        const time = form.time.split(':');
        form.date.setHours(time[0], time[1]);
        const gqlPropsAndData = {
            variables: {
                id: eventData.id,
                title: form.title,
                organization: form.organization,
                description: form.description,
                address: form.address,
                city: form.city,
                state: form.state,
                zip: parseInt(form.zip),
                category: form.category,
                time: form.time,
                date: form.date,
            },
            refetchQueries: [
                {
                    query: getEventById,
                    variables: {id: eventData.id},
                },
            ],
        };
        gqlQuery(updateThisEvent, gqlPropsAndData);
        dispatch(closeModal());
    };

    /**
     * deletes the event
     * @param {OBJECT} event
     */
    const handleDeleteEvent = (event) => {
        const {id} = state.currentUser;
        event.preventDefault();
        const gqlPropsAndData = {
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
        };
        gqlQuery(deleteThisEvent, gqlPropsAndData);
        navigate('/profile');
    };

    return (
        <div className="modal-form">
            <h2 className="text-center">Edit Event</h2>
            <form
                id="form_update"
                className="modal-event-split"
                onSubmit={handleUpdateSubmit}>
                <div className="modal-event">
                    <div className="modal-event-field">
                        <label>Title</label>
                        <input name="title" onChange={onChange} />
                    </div>
                    <div className="modal-event-field">
                        <label>Organization(optional)</label>
                        <input name="organization" onChange={onChange} />
                    </div>
                    <div className="modal-event-field">
                        <label>Description</label>
                        <input name="description" onChange={onChange} />
                    </div>
                    <div className="modal-event-field">
                        <label>Address</label>
                        <input name="address" onChange={onChange} />
                    </div>
                    <div className="modal-event-field">
                        <label>City</label>
                        <input name="city" onChange={onChange} />
                    </div>
                    <div className="modal-event-field">
                        <label>State</label>
                        <input name="state" onChange={onChange} />
                    </div>
                    <div className="modal-event-field">
                        <label>Zip</label>
                        <input name="zip" onChange={onChange} />
                    </div>
                    <div className="modal-event-field">
                        <label>Category</label>
                        <input name="category" onChange={onChange} />
                    </div>
                    <div className="modal-event-field modal-event-center">
                        <label>Time</label>
                        <input name="time" type="time" onChange={onChange} />
                    </div>
                </div>

                <div>
                    <div className="modal-event-calendar">
                        <label>Calendar</label>
                        <Calendar
                            onChange={(value) => {
                                form.date = value;
                            }}
                            value={form.date}
                        />
                    </div>
                </div>
            </form>
            <div className="form_btn_container">
                <button
                    form="form_update"
                    type="submit"
                    className="event_btn text-center">
                    Update
                </button>

                <button
                    onClick={handleDeleteEvent}
                    className="event_btn del_btn text-center">
                    Delete Event
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    state,
});

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

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
