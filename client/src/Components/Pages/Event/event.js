import React from 'react';
import './event.css';
import avatar from '../../Images/CoolGuy.jpg';
import image from '../../Images/gaming-group.jpg';
import checked from '../../Icons/CheckedCircle.svg';
import exclamation from '../../Icons/ExclamationCircle.svg';
import cat from '../../Images/cat.jpg';
import { connect } from 'react-redux';
import { openModal } from '../../../reduxes/actions/modal_actions.js';
import { getEventById } from '../../../util/graphQLQuery';

class Event extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: true,
            event: {},
            exists: false,
            defaultEvent: {
                title: 'Beach Cleanup',
                organization: 'Portland Volunteers NW',
                organizer: {
                    username: 'CoolGuy',
                    role: 'Organizor',
                    image: avatar,
                },
                eventDetails:
                    'Join us Saturday, Jan 24th @9AM for a beach cleanup',
                location: 'seaside townhall, some addresss',
                attendees: [
                    { username: 'CoolGuy', role: 'Organizor', image: avatar },
                    { username: 'T0mCat', role: 'Volunteer', image: cat },
                    { username: 'Rawf', role: 'Volunteer', image: cat },
                    { username: 'SumDude', role: 'Attendee', image: cat },
                ],
                supplies: [
                    {
                        item: 'bags',
                        quantity: 24,
                        volunteers: [
                            { user: 'T0mCat', qty: 12 },
                            { user: 'Rawf', qty: 12 },
                        ],
                    },
                    {
                        item: 'shovels',
                        quantity: 24,
                        volunteers: [
                            { user: 'T0mCat', qty: 2 },
                            { user: 'Rawf', qty: 3 },
                        ],
                    },
                ],
            },
            tooltip: '',
            x: 100,
            y: 500,
        };
    }
    // attendees form
    async componentDidMount() {
        const EventId = this.props.EventId;
        if (!EventId.length) { this.setState({ exists: true }); }

        const data = await this.props.client.query({
            query: getEventById,
            variables: {
                id: EventId,
            }
        });
        console.log(data.data.getEventById);
        // const {title} = data.data.getEventById;
        // console.log(title);
        this.handleSetData(data.data.getEventById);
    }

    handleSetData = (event) => {
        this.setState({
            event,
        });
        console.log(this.state.event.location.address);
    };

    tooltip = (event) => {
        this.setState({ tooltip: event.currentTarget.alt });
    };
    supplyModal = () => {
        // show supply modal to volunteer.
    };

    handleEditClick = () => {
        const { event } = this.state;
        this.props.openModal('EVENT_EDIT', event);
    };

    render() {
        if (this.state.event.organizer) {
            return (
                <div className="event-container">
                    {/* <div className="event-title">
                    
                </div> */}
                    <img className="event-banner" src={image} alt="event banner" />
                    <div className="event-navigation">
                        <h1>{this.state.event.title}</h1>
                        <h1>{this.state.event.organization}</h1>
                        <h1>{this.state.admin ? 'edit' : ''}</h1>
                    </div>
                    <div className="profile-rule" />
                    <div className="event-content">
                        <div className="event-content-middle">
                            <h2>Location</h2>
                            <p>{this.state.event.location.address + this.state.event.location.city + this.state.event.location.state}</p>
                            <h2>Event Details</h2>
                            <p>{this.state.event.eventDetails}</p>
                            <h2>
                                Supplies <img src={checked} alt="checkmark" />{' '}
                                fulfilled{' '}
                                <img src={exclamation} alt="exclamation mark" />{' '}
                                needs supplies
                        </h2>
                            <button onClick={() => this.handleEditClick(this.props.EventId)}>
                                EDIT
                            </button>
                            {/* <ul className="event-supply-list">
                            {this.state.event.supplies.map((supply, i) => {
                                const total = supply.volunteers.reduce(
                                    (total, nextVal) => {
                                        return total.qty + nextVal.qty;
                                    }
                                );
                                return (
                                    <li
                                        key={i}
                                        className="event-supply-item"
                                        onClick={() => {
                                            this.props.openModal('supplies');
                                        }}>
                                        {supply.item}
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
                            })} */}
                            {/* "toast" + usericon for user if task is picked up */}
                            {/* </ul> */}
                            <h2>Attendees</h2>
                            {/* <div className="event-attendees">
                            {this.state.event.attendees.map((attendee, i) => {
                                return (
                                    <div key={i} className="event-attendee">
                                        <p>{attendee.role}</p>{' '}
                                        <img
                                            className="event-attendee-image"
                                            src={attendee.image}
                                            alt={attendee.username}
                                        />
                                        <p>{attendee.username}</p>
                                    </div>
                                );
                            })}
                        </div> */}
                        </div>
                        {/* <div className="event-organizor">
                        <h1>{this.state.event.organizor.role}</h1>
                        <img
                            className="event-organizor-image"
                            src={this.state.event.organizor.image}
                            alt="organizor"
                        />
                        <p>{this.state.event.organizor.username}</p>
                    </div> */}
                    </div>
                    <div>google map</div>
                </div>
            );
        }
        if (!this.state.exists || !this.state.event.organizer) {
            return (<div>Page Not Found</div>)
        }
        else { return (<div></div>) }
    }
}

const mapStateToProps = (state) => ({
    client: state.client,
    state,
});
const mapDispatchToProps = (dispatch) => ({
    openModal: (modal, data) => dispatch(openModal(modal, data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Event);
