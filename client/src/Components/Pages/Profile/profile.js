import React from 'react';
import avatar from '../../Images/CoolGuy.jpg'
import './profile.css';
import { Link } from '@reach/router'
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: "CoolGuy",
                avatar: avatar,
                groups: ["group1", "group2"],
                upcomingEvents: [{ title: "Event1" }, { title: "Event2" }, { title: "Event3" }, { title: "Event4" }],
            }
        }
    }
    render() {
        return (
            <div className="profile-container">

                <div className="profile-user">
                    <h1>{this.state.user.firstName + this.state.user.lastName}</h1>
                    <img className="profile-avatar" src={this.state.user.avatar} alt={"avatar " + this.state.user.firstName + this.state.user.lastName}></img>
                </div>

                <div className="profile-content">

                    <div className="profile-menu">

                        <ul>
                            <li>Edit Profile</li>
                            <li>Create Groups</li>
                            <li>Create Events</li>
                            <li>Past Events</li>
                        </ul>
                    </div>

                    <div className="">
                        <h1>My Groups</h1>
                        <div className="profile-rule"></div>
                        <div className="profile-group">
                            <Link to="/group"><div className="profile-group-card">Group</div></Link>
                            <Link to="/group"><div className="profile-group-card">Group</div></Link>
                        </div>
                    </div>

                    <div>
                        <h1>Upcoming Events</h1>
                        <div className="profile-rule"></div>
                        <div className="profile-events">
                            {this.state.user.upcomingEvents.map((item) => {
                                return (<div className="profile-event-card">
                                    <h2><Link to={"/group/event"}>{item.title}</Link></h2>
                                    <div className="profile-event-details">
                                        <p>Date: {Date(Date.now()).toString()}</p>
                                        <p>Location:</p>
                                    </div>
                                    <h3>Status:Private</h3>
                                </div>)
                            })}
                        </div>
                    </div>
                </div>
            </div>

        );
    }

}

export default Profile