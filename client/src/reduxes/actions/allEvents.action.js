import * as types from './types';
import {getAllEvents} from '../../util/graphQLQuery';

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
    // setTimeout(function() {
    //     console.log('timing');
    dispatch(receiveAllEvents(data));
    // }, 10000);
};
