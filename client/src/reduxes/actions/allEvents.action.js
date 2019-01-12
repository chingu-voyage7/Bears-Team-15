import * as types from './types';
import {getAllEvents, queryFilterEvents} from '../../util/graphQLQuery';

export const receiveAllEvents = (args) => {
    return {
        type: types.ALL_EVENTS,
        payload: args,
    };
};

export const allEvents = (client) => async (dispatch) => {
    const response = await client.query({
        query: getAllEvents,
    });
    const data = await response.data.getAllEvents;

    // !! testing rendering loading to be removed!
    setTimeout(function() {
        dispatch(receiveAllEvents(data));
    }, 10000);
};

export const filterEvents = (client, char) => async (dispatch) => {
    const response = await client.query({
        query: queryFilterEvents,
        variables: {
            char: char,
        },
    });
    const data = await response.data.filterEvent;
    dispatch(receiveAllEvents(data));
};
