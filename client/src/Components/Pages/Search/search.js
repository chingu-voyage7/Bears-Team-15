import React from 'react';
import {connect} from 'react-redux';
import {graphql, compose} from 'react-apollo';

import {allEvents} from '../../../reduxes/actions/allEvents.action';
import SearchWrapper from './styled.search';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchEvent: '',
        };
    }

    handleChangeSearch = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value,
        });
    };

    // on page render grab all events data
    componentDidMount = () => {
        const {client} = this.props.state;
        const {dispatch} = this.props;
        dispatch(allEvents(client));
    };

    getEventsData = () => {
        const {dataAllEvents} = this.props.state;

        if (dataAllEvents.length <= 0) {
            return (
                <div className="wrapper__loading">
                    <p>LOADING...</p>
                </div>
            );
        } else {
            return (
                <div className="search__results">
                    {dataAllEvents.map((item) => (<div className="search-container">
                        <div key={item.id} className="search-event">
                            <h1>{item.title}</h1>
                            <p>{item.description}</p>
                            <p>{item.date}</p>
                            <div>
                                <h4>attendee:</h4>
                                <div>
                                    {item.attendees.map((attendee, i) => (
                                        <p key={i}>{attendee.lastName}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                        </div>
                    ))}
               
                </div>
            ); 
        }
    };

    render() {
        const {searchEvent} = this.state;
        return (
            <SearchWrapper>
                <form className="wrapper__form_search">
                    <div className="search-form">
                        <label>Search</label>
                        <div className="input_btn_wrapper">
                            <input
                                name="searchEvent"
                                value={searchEvent}
                                onChange={this.handleChangeSearch}
                            />
                            <button>Go!</button>
                        </div>
                    </div>
                </form>
                <h1 className="search_header">EVENTS</h1>
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
