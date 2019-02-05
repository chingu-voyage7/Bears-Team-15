import React from 'react';
import {Link} from '@reach/router';

const Card = ({item, owner}) => {
    return (
        <Link key={item.id} to={`/event/${item.id}`}>
            <div className="profile-event-card">
                <p>{item.title}</p>
                <h2>{owner ? 'OWNER' : ' ATTENDEE'}</h2>
                <div className="profile-event-details">
                    <p>{item.date}</p>
                    <p>{item.location}</p>
                </div>
                <h3>{item.visibility}</h3>
            </div>
        </Link>
    );
};

export default Card;
