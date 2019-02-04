import React from 'react';
// import avatar from '../../Images/CoolGuy.jpg';
import './profile.css';
import {Link} from '@reach/router';
import {connect} from 'react-redux';
import {graphql, compose} from 'react-apollo';
import {getUser} from '../../../util/graphQLQuery';
import {openModal} from '../../../reduxes/actions/modal_actions.js';
import Card from '../../Common/Card/Card';

class Profile extends React.Component {
    renderLoading = () => {
        if (this.props.getUser.loading === true) {
            return <div>loading</div>;
        } else {
            const user = this.props.getUser.getUser;

            return (
                <div className="profile-container">
                    <div className="profile-user">
                        {/* <h1>{user.username}</h1> */}
                        <img
                            className="profile-avatar"
                            // src={user.avatar}
                            alt={'avatar'}
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
                                        <Card
                                            key={item.id}
                                            item={item}
                                            owner={true}
                                        />
                                    );
                                })}
                            </div>

                            <div className="profile-events">
                                {user.attendedEvent.map((item, i) => {
                                    return (
                                        <Card
                                            key={item.id}
                                            item={item}
                                            owner={false}
                                        />
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
    currentUser: state.currentUser,
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
                    id: props.currentUser.id,
                },
            };
        },
    })
)(Profile);
