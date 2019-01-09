import React from 'react';
import {connect} from 'react-redux';
import {graphql, compose} from 'react-apollo';

import {getAllEvents} from '../../../util/graphQLQuery';
import {allEvents} from '../../../reduxes/actions/allEvents.action';

import './search.css';
class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            sampleData: [],
            data: [],
            sampleSchema: {
                title: 'event',
                description: 'description',
                date: Date(Date.now()).toString(),
                location: 'Long Beach, CA',
            },
        };
    }

    componentDidMount = async () => {
        this.setState({sampleData: this.setData()});
        const {client} = this.props.state;
        const {dispatch} = this.props;
        dispatch(allEvents(client));

        // const response = await client.query({
        //     query: getAllEvents,
        // });
    };

    setData = () => {
        let dataset = [];
        for (let i = 0; i < 10; i++) {
            dataset.push(this.state.sampleSchema);
        }

        return dataset;
    };

    // search=(event)=>{
    // let search= event.target.input;
    // console.log(event);

    // //search()
    // }

    render() {
        return (
            <div>
                <form>
                    <div className="search-form">
                        <label>Search</label>
                        <input />
                        <button>Go!</button>
                    </div>
                </form>
                {this.state.sampleData.map((item, i) => {
                    return (
                        <div key={i} className="search-event">
                            <h1>{item.title}</h1>
                            <p>{item.description}</p>
                            <p>{item.date}</p>
                        </div>
                    );
                })}
            </div>
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
