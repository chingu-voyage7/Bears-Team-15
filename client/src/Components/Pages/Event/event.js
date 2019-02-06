import React from 'react';
import './event.css';
import avatar from '../../Images/CoolGuy.jpg';
import image from '../../Images/gaming-group.jpg';
import checked from '../../Icons/CheckedCircle.svg';
import exclamation from '../../Icons/ExclamationCircle.svg';
import cat from '../../Images/cat.jpg';
import {connect} from 'react-redux';
import {openModal} from '../../../reduxes/actions/modal_actions.js';
import {
    getEventById,
    attendEvent,
    getUser,
    unAttendEvent,
} from '../../../util/graphQLQuery';
import {withApollo, graphql, compose} from 'react-apollo';
import {userHandleAttendAction} from '../../../reduxes/actions/attendEvent.action';
class Event extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // attendees form
    async componentDidMount() {
        const EventId = this.props.EventId;
        if (!EventId.length) {
            this.setState({exists: true});
        }

        const data = await this.props.client.query({
            query: getEventById,
            variables: {
                id: EventId,
            },
        });
        // const {title} = data.data.getEventById;

        this.handleSetData(data.data.getEventById);
    }

    handleSetData = (event) => {
        this.setState({
            event,
        });
    };

    supplyModal = () => {
        // show supply modal to volunteer.
    };

    /**
     * this method will handle unattend event
     * this current user is not the owner this event
     *
     */
    handleUnattendEvent = (eventId, currentUserId) => {
        const {unAttendEvent, dispatch} = this.props;

        const gqlData = {
            variables: {
                eventId,
                currentUserId,
            },
            refetchQueries: [
                {
                    query: getUser,
                    variables: {id: currentUserId},
                },
            ],
        };
        dispatch(userHandleAttendAction(unAttendEvent, gqlData));
    };

    /**
     * This method will handle editing the current event
     */
    handleEditClick = () => {
        const {event} = this.state;
        this.props.openModal('EVENT_EDIT', event);
    };

    /**
     * handles a user who wants to attend the event
     * @param {ID} eventId event ID that is currently being viewed
     * @param {ID} attendeeId user attendee ID currently login user
     */
    handleAttendEvent = (eventId, attendeeId) => {
        const {attendEvent, dispatch} = this.props;

        const gqlData = {
            variables: {
                eventId,
                attendeeId,
            },
            refetchQueries: [
                {
                    query: getUser,
                    variables: {id: attendeeId},
                },
            ],
        };

        // call dispatch so action will be created
        // on fn userWillAttendEvent pass the gqlQuery
        // and  variable and refetchqueries
        dispatch(userHandleAttendAction(attendEvent, gqlData));
    };

    /**
     * this function renders a button if its a creator or attendee
     * @param {STRING} eventOwnerId get this from the event data
     * @param {BOOLEAN} isAttending if user has already attended
     */
    renderToggleBtn = (eventOwnerId, isAttending) => {
        // this user id is current login user
        const {id} = this.props.currentUser;
        // event ID
        const {EventId} = this.props;

        if (id === eventOwnerId) {
            // ! handling edit event
            return (
                <button onClick={() => this.handleEditClick(EventId)}>
                    EDIT
                </button>
            );
        } else {
            if (isAttending) {
                // ! handling unattend event
                return (
                    <button
                        onClick={() => this.handleUnattendEvent(EventId, id)}>
                        Unattend
                    </button>
                );
            } else {
                // ! handling attend event
                return (
                    <button onClick={() => this.handleAttendEvent(EventId, id)}>
                        Attend
                    </button>
                );
            }
        }
    };

    /**
     * loops thru the current users attended events
     * @param {OBJECT} getUser current user
     * @param {ID} eventID current event that is being viewe
     * @returns {BOOLEAN}
     */
    checkCurrentUserIfAttendingTheCurrentEvent = (getUser, eventID) => {
        // null checker,
        // if you wont validate getUser it will give error on logout
        if (!getUser) return;

        const hasEvent = getUser.attendedEvent.filter(
            (item) => item.id === eventID
        );

        return hasEvent.length ? true : false;
    };
    renderAddSupply = () => {
        const {id, organizer} = this.props.getEventById.getEventById;

        if (this.props.currentUser.id == organizer.id) {
            return (
                <button onClick={() => this.props.openModal('ADD_SUPPLY', id)}>
                    add supplies
                </button>
            );
        }
        return;
    };

    /**
     * Rendering component function here
     * @returns {COMPONENT}
     */
    renderData = () => {
        const event = this.props.getEventById;
        if (event.loading) {
            return <div>LOADING...</div>;
        } else {
            const {
                id: eventID,
                organizer,
                description,
                img,
                location,
                supplies,
                title,
                attendees,
                date,
            } = event.getEventById;

            const {getUser} = event;

            const isAttend = this.checkCurrentUserIfAttendingTheCurrentEvent(
                getUser,
                eventID
            );

            const parseDate = new Date(parseInt(date));
            const time = parseDate.toLocaleTimeString();

            const dateString = parseDate.toDateString();

            return (
                <div className="event-container">
                    {/* <img
                        className="event-banner"
                        src={image}
                        alt="event banner"
                    /> */}
                    <div className="event-banner" />
                    <div className="event-navigation">
                        <h1>{title}</h1>
                        {/* <h1>{organization}</h1> */}
                        <h1>{this.renderToggleBtn(organizer.id, isAttend)}</h1>
                    </div>
                    <div className="profile-rule" />
                    <div className="event-content">
                        <div className="event-content-middle">
                            <h2>Location</h2>
                            <p>
                                {location.address}
                                <br />
                                {location.city}
                                <br />
                                {location.state + ' ' + location.zip}
                            </p>
                            <h2>Date</h2>
                            <p>{dateString}</p>
                            <h2>Time</h2>
                            <p>{time}</p>
                            <h2>Event Details</h2>
                            <p>{description}</p>

                            <h2>
                                Supplies
                                <img
                                    src={checked}
                                    alt="checkmark"
                                /> fulfilled{' '}
                                <img src={exclamation} alt="exclamation mark" />{' '}
                                needs supplies
                            </h2>
                            {this.renderAddSupply()}
                            <ul className="event-supply-list">
                                {supplies.map((supply) => {
                                    let total = 0;
                                    const volunteers = supply.volunteers;
                                    if (volunteers.length) {
                                        total = volunteers.reduce(
                                            (total, nextVal) => {
                                                return total + nextVal.quantity;
                                            },
                                            0
                                        );
                                    }
                                    return (
                                        <li
                                            id={supply.id}
                                            onClick={() => {
                                                this.props.openModal(
                                                    'SUPPLY_FORM',
                                                    {
                                                        supply: supply,
                                                        eventId: eventID,
                                                    }
                                                );
                                            }}
                                            className="event-supply-item">
                                            {supply.name}
                                            <img
                                                src={
                                                    total >= supply.quantity
                                                        ? checked
                                                        : exclamation
                                                }
                                                alt="some text"
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                            <h2>Attendees</h2>
                            {event.getUser.attendedEvent.map(function(item) {
                                return <img src="" alt="" />;
                            })}
                        </div>
                        <div>google map</div>
                    </div>
                </div>
            );
        }
    };

    render() {
        return <div>{this.renderData()}</div>;
    }
}

const mapStateToProps = (state) => ({
    client: state.client,
    state,
    currentUser: state.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
    openModal: (modal, data) => dispatch(openModal(modal, data)),
    dispatch,
});

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    graphql(getEventById, {
        name: 'getEventById',
        options: (props) => {
            return {
                variables: {
                    id: props.EventId,
                    uID: props.currentUser.id,
                },
            };
        },
    }),
    graphql(attendEvent, {
        name: 'attendEvent',
    }),
    graphql(unAttendEvent, {
        name: 'unAttendEvent',
    })
)(withApollo(Event));
