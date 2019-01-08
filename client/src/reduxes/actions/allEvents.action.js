import * as types from './types';
import {getAllEvents} from '../../util/graphQLQuery';

export const receiveAllEvents = (args) => {
    console.log(types.ALL_EVENTS);
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
    dispatch(receiveAllEvents(data));
};
