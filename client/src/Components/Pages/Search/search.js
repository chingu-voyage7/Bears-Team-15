import React from 'react';
import {connect} from 'react-redux';
// graphql, compose,
import {withApollo} from 'react-apollo';

import {
    allEvents,
    filterEvents,
} from '../../../reduxes/actions/allEvents.action';
import SearchWrapper from './styled.search';
import {Link} from '@reach/router';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchEvent: '',
            isFetching: false,
        };
    }

    handleChangeSearch = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value,
        });
    };

    componentWillMount() {
        const {id} = this.props.state.currentUser;
        const {dispatch} = this.props;
        dispatch(allEvents(this.props.client, id));
        this.setState({
            isFetching: true,
        });
    }

    handleSubmitQuery = (e) => {
        const {id} = this.props.state.currentUser;
        e.preventDefault();
        const {dispatch} = this.props;
        const {searchEvent} = this.state;
        dispatch(filterEvents(this.props.client, searchEvent, id));
        this.setState({
            isFetching: true,
        });
    };

    handleStatus = () => {
        const {isFetching} = this.state;
        const {isQueryEventSuccess, events} = this.props.state.dataAllEvents;
        if (isFetching && !isQueryEventSuccess && events !== null) {
            return (
                <div className="wrapper__loading">
                    <p>LOADING...</p>
                </div>
            );
        } else if (!isQueryEventSuccess && events === null) {
            return (
                <div className="wrapper__loading">
                    <p>SOMETHING IS WRONG CONTACT PROVIDER!</p>
                </div>
            );
        }
    };

    getEventsData = () => {
        const {events, isQueryEventSuccess} = this.props.state.dataAllEvents;

        if (isQueryEventSuccess && events.length > 0) {
            return (
                <div className="search__results">
                    {events.map((event, i) => (
                        <Link key={event.id} to={`/event/${event.id}`}>
                            <div className="search-container">
                                <div className="search-event">
                                    <h1>{event.title}</h1>
                                    <p>{event.description}</p>
                                    <p>{event.date}</p>
                                    <div>
                                        <h4>{'attendees: '+ event.attendees.length}</h4>
                                        {/* <div>
                                            {event.attendees.map((attendee) => (
                                                <p key={attendee.id}>
                                                    {attendee.lastName}
                                                </p>
                                            ))}
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            );
        } else if (isQueryEventSuccess && events.length <= 0) {
            return (
                <div className="wrapper__loading">
                    <p>SORRY NO SUCH NAME</p>
                </div>
            );
        }
    };

    render() {
        const {searchEvent} = this.state;
        return (
            <SearchWrapper>
                <form
                    className="wrapper__form_search"
                    onSubmit={this.handleSubmitQuery}>
                    <div className="search-form">
                        <label>Search</label>
                        <div className="input_btn_wrapper">
                            <input
                                name="searchEvent"
                                value={searchEvent}
                                onChange={this.handleChangeSearch}
                                placeholder="NAME OF EVENT"
                            />
                            <button>Go!</button>
                        </div>
                    </div>
                </form>
                <h1 className="search_header">EVENTS</h1>
                {this.handleStatus()}
                {this.getEventsData()}
            </SearchWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    state,
});

const mapDispatchToProps = (dispatch) => ({
    dispatch,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withApollo(Search));
