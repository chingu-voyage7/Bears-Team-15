import React from 'react';
import avatar from '../../Images/CoolGuy.jpg';
import './profile.css';
import { Link } from '@reach/router';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { getUser } from '../../../util/graphQLQuery';
import { openModal } from '../../../reduxes/actions/modal_actions.js';

class Profile extends React.Component {
    renderLoading = () => {
        // console.log(this.props.user, 'user');
        if (this.props.getUser.loading === true) {
            return <div>loading</div>;
        } else {
            const user = this.props.getUser.getUser;
            console.log(user, 'USEEEEERRSSS');
            return (
                <div className="profile-container">
                    <div className="profile-user">
                        <h1>{user.firstName}</h1>
                        <img
                            className="profile-avatar"
                            src={user.image}
                            alt={'avatar ' + user.firstName}

                        />
                    </div>
                    <div className="profile-content">
                        <div className="profile-menu">
                            <ul>
                                <li
                                    onClick={() =>
                                        this.props.openModal(
                                            'EDIT_PROFILE_FORM',
                                            user
                                        )
                                    }>
                                    Edit Profile
                                </li>
                                <li
                                    onClick={() =>
                                        this.props.openModal(
                                            'NEW_EVENT_FORM',
                                            user.id
                                        )
                                    }>
                                    Create Events
                                </li>
                                <li>Past Events</li>
                            </ul>
                        </div>
                        <div className="profile-list">
                            <h2 className="profile-list-title">
                                Upcoming Events
                            </h2>
                            <div className="profile-rule" />
                            <div className="profile-events">
                                {user.eventsId.map((item, i) => {
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
    };

    render() {
        return <div>{this.renderLoading()}</div>;
    }
}

const mapStateToProps = (state) => ({
    user: state.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
    openModal: (args, data) => dispatch(openModal(args, data)),
});

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    graphql(getUser, {
        name: 'getUser',
        options: (props) => {
            return {
                variables: {
                    id: props.user.id,
                },
            };
        },
    })
)(Profile);
