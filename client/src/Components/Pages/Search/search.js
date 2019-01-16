import React from 'react';
import {connect} from 'react-redux';
import {graphql, compose} from 'react-apollo';

import {
    allEvents,
    filterEvents,
} from '../../../reduxes/actions/allEvents.action';
import SearchWrapper from './styled.search';

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
        const {client} = this.props.state;
        const {dispatch} = this.props;
        dispatch(allEvents(client));
        this.setState({
            isFetching: true,
        });
    }

    handleSubmitQuery = (e) => {
        e.preventDefault();
        const {client} = this.props.state;
        const {dispatch} = this.props;
        const {searchEvent} = this.state;
        dispatch(filterEvents(client, searchEvent));
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
                        <div key={event.id} className="search-container">
                            <div className="search-event">
                                <h1>{event.title}</h1>
                                <p>{event.description}</p>
                                <p>{event.date}</p>
                                <div>
                                    <h4>attendee:</h4>
                                    <div>
                                        {event.attendees.map((attendee, i) => (
                                            <p key={i}>{attendee.lastName}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
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
)(Search);
