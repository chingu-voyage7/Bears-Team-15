import React from 'react';
import avatar from '../../Images/CoolGuy.jpg';
import './profile.css';
import {Link} from '@reach/router';
import {connect} from 'react-redux';
import {graphql, compose} from 'react-apollo';
import {getUser} from '../../../util/graphQLQuery' 
import { openModal } from '../../../reduxes/actions/modal_actions.js'
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                avatar: '',
                eventsId: [],
            },
            
        };
    }

   async componentDidMount() {
        // unecessary with redux just use props
        console.log(this.props.user.id);
        const user= await this.props.client
            .query({
                query: getUser,
                variables: {
                    id: this.props.user.id,
                },
            });
            // .then((data) => {
            //     console.log("setting state",data.data.getUser);
               
            //     console.log(this.state.user);
            // });
            this.initializeProfile(user.data.getUser);

        // console.log("from GraphQL",);
        // const timestamp = Date(Date.now()).toString();
        // const defaultUser = {
        //     username: 'CoolGuy',
        //     avatar: avatar,
        //     events: [
        //         {
        //             title: 'Event1',
        //             date: timestamp,
        //             location: 'Some Street San Jose, California',
        //             visibility: 'Public',
        //         },
        //         {
        //             title: 'Event2',
        //             date: timestamp,
        //             location: 'Some Street San Jose, California',
        //             visibility: 'Public',
        //         },
        //         {
        //             title: 'Event3',
        //             date: timestamp,
        //             location: 'Some Street San Jose, California',
        //             visibility: 'Public',
        //         },
        //         {
        //             title: 'Event4',
        //             date: timestamp,
        //             location: 'Some Street San Jose, California',
        //             visibility: 'Public',
        //         },
        //     ],
        // };

        // this.initializeProfile(defaultUser);
    }

    initializeProfile = (user) => {
        console.log(user);
        this.setState({
            user,
        });
        console.log('fromState',this.state.user.eventsId);
    };

    render() {
        return (
            <div className="profile-container">
                <div className="profile-user">
                    <h1>{this.state.user.username}</h1>
                    <img
                        className="profile-avatar"
                        src={this.state.user.avatar}
                        alt={'avatar ' + this.state.user.username}
                    />
                </div>
                <div className="profile-content">
                    <div className="profile-menu">
                        <ul>
                            <li onClick={()=>this.props.openModal('EDIT_PROFILE_FORM',this.state.user)}>Edit Profile</li>
                            <li onClick={()=>this.props.openModal('NEW_EVENT_FORM',this.props.user.id)}>Create Events</li>
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
                        <div className="profile-rule" />
                        <div className="profile-events">
                            {this.state.user.eventsId.map((item, i) => {
                                return (
                                    <Link key={i} to={`/event/${item.id}`}>
                                        <div className="profile-event-card">
                                            <p>{item.title}</p>
                                            <div className="profile-event-details">
                                                <p>{item.date}</p>
                                                <p>{item.location}</p>
                                            </div>
                                            <h3>{item.visibility}</h3>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    client: state.client,
    user: state.currentUser,
});
const mapDispatchToProps=(dispatch)=>({
    openModal:(args,data)=>dispatch(openModal(args,data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
