import React from 'react';
import avatar from '../../Images/CoolGuy.jpg'
import './profile.css';
import { Link } from '@reach/router'
import edit from '../../Icons/edit.svg'


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                avatar: '',
                upcomingEvents: [],
            }
       
        }
    }

    componentDidMount() {
        // unecessary with redux just use props
        const timestamp=Date(Date.now()).toString();
        const defaultUser = {
            username: "CoolGuy",
            avatar: avatar,
            events: [
            { title: "Event1", date: timestamp, location:"Some Street San Jose, California", visibility: "Public" },
            { title: "Event2", date: timestamp, location:"Some Street San Jose, California", visibility: "Public" },
            { title: "Event3", date: timestamp, location:"Some Street San Jose, California", visibility: "Public" },
            { title: "Event4", date: timestamp, location:"Some Street San Jose, California", visibility: "Public" }]
        }

        this.initializeProfile(defaultUser);

    }

    initializeProfile = (user) => {
     
        this.setState({
            user: {
                username: user.username,
                avatar: user.avatar,
                upcomingEvents: user.events
            }
        });
   
    }
   

    render() {
        return (
            <div className="profile-container">
                <div className="profile-user">
                    <h1>{this.state.user.username}</h1>
                    <img className="profile-avatar" src={this.state.user.avatar} alt={"avatar " + this.state.user.username}></img>
                </div>
                <div className="profile-content">
                    <div className="profile-menu">
                        <ul>
                            <li>Edit Profile</li>
                            <li>Create Events</li>
                            <li>Past Events</li>
                        </ul>
                    </div>

                    {/* <div className="">
                        <h1>My Groups</h1>
                        <div className="profile-rule"></div>
                        <div className="profile-group">
                            <Link to="/group"><div className="profile-group-card">Group</div></Link>
                            <Link to="/group"><div className="profile-group-card">Group</div></Link>
                        </div>
                    </div> */}

                    <div className="profile-list">
                        <h2 className="profile-list-title">Upcoming Events</h2>
                        <div className="profile-rule"></div>
                        <div className="profile-events">
                            {this.state.user.upcomingEvents.map((item) => {
                                return (<Link to={"/group/event"}><div className="profile-event-card">
                                   <p>{item.title}</p>
                                    <div className="profile-event-details">
                                        <p>{item.date}</p>
                                        <p>{item.location}</p>
                                    </div>
                                    <h3>{item.visibility}</h3>
                                </div></Link>)
                            })}
                        </div>
                    </div>
                </div>
            </div>

        );
    }

}

export default Profile