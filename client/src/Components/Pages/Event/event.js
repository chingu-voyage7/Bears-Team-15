import React from 'react'
import './event.css'
import avatar from '../../Images/CoolGuy.jpg'
import image from '../../Images/gaming-group.jpg'
class Event extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }


    render(){
        return(
            <div className="event-container">
            <div className="event-title">
            <h1 >The Gamers Republic</h1>
            </div> 
            <img className="event-banner" src={image} alt="event banner"></img>
                <div className="event-navigation">
                    <h1>Down Town Brunch</h1>
                    <h1>Volunteer</h1>
                </div>
                <div className="profile-rule"></div>
                <div className="event-content">
                <div className="event-content-middle">
                    <h2>Location</h2>
                    <h2>Event Details</h2>
                    <h2>Supplies +</h2>
                    <ul className="event-supply-list">
                        <li>{"toast"}</li>
                        <li>bread</li>

                        {/* "toast" + usericon for user if task is picked up */}
                    </ul>
                    <h2>Attendees +</h2>
                    <div className="event-attendees">
                    <img className="event-attendee"src={avatar}alt="organizor"></img>
                    <img className="event-attendee"src={avatar}alt="organizor"></img>
                    </div>
                </div>
                <div>
                    <div>
                    <h1>Organizor</h1>
                    <img className="event-organizor"src={avatar}alt="organizor"></img>
                    <h3>CoolGuy</h3>
                    </div>
                </div>
                </div>
                
            </div>
        )
    }


}

export default Event

