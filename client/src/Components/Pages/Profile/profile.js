import React from 'react';
import avatar from '../../Images/CoolGuy.jpg'
import './profile.css';
import { Link } from '@reach/router'
class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user:{
                name: "CoolGuy",
                avatar: avatar,
                groups:["group1","group2"],
                currentEvents:[{title: "Event1"},{title: "Event2"},{title: "Event3"},{title: "Event4"}],
            }   
        }
    }
    render(){
        return(
            <div className="profile-container">
            
            <div className="profile-user">
                <h1>{this.state.user.name}</h1>
                <img className="profile-avatar" src={this.state.user.avatar} alt={"avatar "+ this.state.user.name}></img>
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
               
                <div className="profile-events">
                <h1>My Groups</h1>
                <div className="profile-rule">
                </div>
                <div className="profile-group">
                <div className="profile-group-card">Group</div>
                <div className="profile-group-card">Group</div>
                </div>
                </div>
            
                <div className="profile-events">
                    <h1>My Events</h1>
                    <div className="profile-rule"></div>
                    {this.state.user.currentEvents.map((item)=>{
                        return(<div className="profile-event-card">
                        <h1><Link to={"/profile/"+item.title}>{item.title}</Link></h1>
                        <div className="profile-event-details">
                        <p>Date: {Date(Date.now()).toString()}</p>
                        <p>Location:</p>
                        </div>
                        <h1>Status:Private</h1>
                        
                        </div>)
                    })}
                </div>
                </div>
            </div>

        );
    }

}

export default Profile