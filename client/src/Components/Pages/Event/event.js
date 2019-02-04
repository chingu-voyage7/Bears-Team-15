import React from 'react';
import './event.css';
import avatar from '../../Images/CoolGuy.jpg';
import image from '../../Images/gaming-group.jpg';
import checked from '../../Icons/CheckedCircle.svg';
import exclamation from '../../Icons/ExclamationCircle.svg';
import cat from '../../Images/cat.jpg';
import {connect} from 'react-redux';
import {openModal} from '../../../reduxes/actions/modal_actions.js';
import {getEventById} from '../../../util/graphQLQuery';
import {withApollo, graphql, compose} from 'react-apollo';
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
                // location: 'seaside townhall, some addresss',
                attendees: [
                    {username: 'CoolGuy', role: 'Organizor', image: avatar},
                    {username: 'T0mCat', role: 'Volunteer', image: cat},
                    {username: 'Rawf', role: 'Volunteer', image: cat},
                    {username: 'SumDude', role: 'Attendee', image: cat},
                ],
                supplies: [
                    {
                        item: 'bags',
                        quantity: 24,
                        volunteers: [
                            {user: 'T0mCat', qty: 12},
                            {user: 'Rawf', qty: 12},
                        ],
                    },
                    {
                        item: 'shovels',
                        quantity: 24,
                        volunteers: [
                            {user: 'T0mCat', qty: 2},
                            {user: 'Rawf', qty: 3},
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

    renderData = () => {
        const event = this.props.getEventById;

        // console.log('test:', event.getEventById);

        if (event.loading) {
            return <div>LOADING...</div>;
        } else {
            const {
                description,
                img,
                location,
                supplies,
                title,
                date
            } = event.getEventById;
            console.log(event.getEventById);
            console.log(this.props.currentUser);
            const parseDate=new Date(parseInt(date));
            const time=parseDate.toLocaleTimeString();

            const dateString = parseDate.toDateString();
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
                        <h1>
                            {this.state.admin ? (
                                <button
                                    onClick={() =>
                                        this.handleEditClick(this.props.EventId)
                                    }>
                                    EDIT
                                </button>
                            ) : (
                                ''
                            )}
                        </h1>
                    </div>
                    <div className="profile-rule" />
                    <div className="event-content">
                        <div className="event-content-middle">
                            <h2>Location</h2>
                            <p>
                                {location.address}
                                <br/>
                                {location.city}
                                <br/>
                                {location.state+ ' '+ location.zip}
                            </p>
                            <h2>Date</h2>
                            <p>{dateString}</p>
                            <h2>Time</h2>
                            <p>{time}</p>
                            <h2>Event Details</h2>
                            <p>{description}</p>
                            
                            <h2>
                                Supplies
                                 <img src={checked} alt="checkmark" />{' '}
                                fulfilled{' '}
                                <img src={exclamation} alt="exclamation mark" />{' '}
                                needs supplies
                            </h2> 
                            <button onClick={()=>this.props.openModal('ADD_SUPPLY')}>add supplies</button>
                            <ul className="event-supply-list">
                            {supplies.map((supply) => {
                                let total= 0;
                                if(supply.volunteers.length){
                                    total = supply.volunteers.reduce((total, nextVal) => {
                                    return total.qty + nextVal.qty;
                                });
                                }                   
                                return <li className="event-supply-item">
                                {supply.name}
                                <img src={total >= supply.quantity ? checked : exclamation} alt="some text"></img>
                                </li>
                            })}
                           
                            
                           
</ul>
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
                },
            };
        },
    })
)(withApollo(Event));
