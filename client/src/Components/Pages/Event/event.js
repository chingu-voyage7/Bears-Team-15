import React from 'react';
import './event.css';
import avatar from '../../Images/CoolGuy.jpg';
import image from '../../Images/gaming-group.jpg';
import checked from '../../Icons/CheckedCircle.svg';
import exclamation from '../../Icons/ExclamationCircle.svg';
import cat from '../../Images/cat.jpg';
import {connect} from 'react-redux';
import {openModal} from '../../../reduxes/actions/modal_actions.js';
import {getEventById, attendEvent, getUser} from '../../../util/graphQLQuery';
import {withApollo, graphql, compose} from 'react-apollo';
import {userWillAttendEvent} from '../../../reduxes/actions/attendEvent.action';
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
        // console.log(title);
        this.handleSetData(data.data.getEventById);
    }

    handleSetData = (event) => {
        this.setState({
            event,
        });
    };

    tooltip = (event) => {
        this.setState({tooltip: event.currentTarget.alt});
    };
    supplyModal = () => {
        // show supply modal to volunteer.
    };

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
        dispatch(userWillAttendEvent(attendEvent, gqlData));
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
            return (
                <button onClick={() => this.handleEditClick(EventId)}>
                    EDIT
                </button>
            );
        } else {
            if (isAttending) {
                //TODO: unattend here fn
                return <button>Unattend</button>;
            } else {
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
        const hasEvent = getUser.attendedEvent.filter(
            (item) => item.id === eventID
        );

        return hasEvent.length ? true : false;
    };

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
            } = event.getEventById;

            const {getUser} = event;

            const isAttend = this.checkCurrentUserIfAttendingTheCurrentEvent(
                getUser,
                eventID
            );

            return (
                <div className="event-container">
                    <img
                        className="event-banner"
                        src={image}
                        alt="event banner"
                    />
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
                                {location.address +
                                    location.city +
                                    location.state}
                            </p>
                            <h2>Event Details</h2>
                            {/* <p>{description}</p> */}
                            <h2>
                                Supplies <img src={checked} alt="checkmark" />{' '}
                                fulfilled{' '}
                                <img src={exclamation} alt="exclamation mark" />{' '}
                                needs supplies
                            </h2>
                            <h2>Attendees</h2>
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
    })
)(withApollo(Event));
