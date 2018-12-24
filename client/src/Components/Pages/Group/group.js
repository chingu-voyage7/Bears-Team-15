import React from 'react';
import './group.css';
class Group extends React.Component{

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
            <div className="Group-content">
            
            </div>
            
        </div>
    )
}

}
export default Group