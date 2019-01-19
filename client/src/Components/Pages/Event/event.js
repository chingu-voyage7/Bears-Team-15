import React from 'react'
import './event.css'
import avatar from '../../Images/CoolGuy.jpg'
import image from '../../Images/gaming-group.jpg'
import checked from '../../Icons/CheckedCircle.svg'
import exclamation from '../../Icons/ExclamationCircle.svg'
import cat from '../../Images/cat.jpg'
import { connect } from 'react-redux'
import { openModal } from '../../../reduxes/actions/modal_actions.js'
import { getEventById } from "../../../util/graphQLQuery";
class Event extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: true,
            event: {
                title: "Beach Cleanup",
                organization: "Portland Volunteers NW",
                organizor: { username: "CoolGuy", role: "Organizor", image: avatar },
                eventDetails: "Join us Saturday, Jan 24th @9AM for a beach cleanup",
                location: "seaside townhall, some addresss",
                attendees: [
                    { username: "CoolGuy", role: "Organizor", image: avatar },
                    { username: "T0mCat", role: "Volunteer", image: cat },
                    { username: "Rawf", role: "Volunteer", image: cat },
                    { username: "SumDude", role: "Attendee", image: cat }
                ],
                supplies: [{ item: "bags", quantity: 24, volunteers: [{ user: "T0mCat", qty: 12 }, { user: "Rawf", qty: 12 }] },
                { item: "shovels", quantity: 24, volunteers: [{ user: "T0mCat", qty: 2 }, { user: "Rawf", qty: 3 }] }]

            },
            tooltip: "",
            x: 100,
            y: 500,
        }
    }
    // attendees form 
    componentDidMount() {
        // set state unecessary with redux just use props
        console.log(this.props.EventId)
        this.props.client.query({
            query: getEventById,
            variables: {
                id:this.props.EventId
            }
        }).then(data=>{
            console.log(data);
        });
        

    }

    tooltip = (event) => {

        this.setState({ tooltip: event.currentTarget.alt });
    }
    supplyModal = () => {
        // show supply modal to volunteer.
    }

    render() {
        return (
            <div className="event-container">
                {/* <div className="event-title">
                    
                </div> */}
                <img className="event-banner" src={image} alt="event banner"></img>
                <div className="event-navigation">
                    <h1>{this.state.event.title}</h1><h1>{this.state.event.organization}</h1> 
                    <h1>{this.state.admin?'edit': ''}</h1>
                </div>
                <div className="profile-rule"></div>
                <div className="event-content">
                    <div className="event-content-middle">
                        <h2>Location</h2>
                        <p>
                            {this.state.event.location}
                        </p>
                        <h2>Event Details</h2>
                        <p>{this.state.event.eventDetails}</p>
                        <h2>Supplies <img src={checked} alt="checkmark" /> fulfilled <img src={exclamation} alt="exclamation mark" /> needs supplies</h2>
                        <ul className="event-supply-list">
                            {this.state.event.supplies.map((supply) => {
                                const total = supply.volunteers.reduce((total, nextVal) => {
                                    return total.qty + nextVal.qty;
                                });
                                return <li className="event-supply-item" onClick={() => { this.props.openModal("SUPPLIES") }}>{supply.item}<img src={total >= supply.quantity ? checked : exclamation} alt="some text"></img></li>
                            })}
                            {/* "toast" + usericon for user if task is picked up */}
                        </ul>
                        <h2>Attendees</h2>
                        <div className="event-attendees">
                            {this.state.event.attendees.map((attendee) => {
                                return <div className="event-attendee"><p>{attendee.role}</p> <img className="event-attendee-image" src={attendee.image} alt={attendee.username} />
                                    <p>{attendee.username}</p>
                                </div>
                            })

                            }

                        </div>
                    </div>
                    <div className="event-organizor">
                        <h1>{this.state.event.organizor.role}</h1>
                        <img className="event-organizor-image" src={this.state.event.organizor.image} alt="organizor" />
                        <p>{this.state.event.organizor.username}</p>
                    </div>
                </div>
                <div>
                    google map
                    </div>
            </div>
        )
    }


}

const mapStateToProps = (state) => ({
    client: state.client
});
const mapDispatchToProps = (dispatch) => ({
    openModal: (modal) => dispatch(openModal(modal))
});



export default connect(mapStateToProps, mapDispatchToProps)(Event);

