import * as types from './types';
import {getAllEvents, queryFilterEvents} from '../../util/graphQLQuery';

export const receiveAllEvents = (args) => {
    return {
        type: types.ALL_EVENTS,
        payload: {
            events: args.events,
            isQueryEventSuccess: args.isQueryEventSuccess,
        },
    };
};

export const allEvents = (client) => async (dispatch) => {
    const dataEvents = {
        events: [],
        isQueryEventSuccess: false,
    };
    dispatch(receiveAllEvents(dataEvents));
    try {
        const response = await client.query({
            query: getAllEvents,
        });

        const data = await response.data.getAllEvents;

        const allEvents = {
            events: data,
            isQueryEventSuccess: true,
        };
        console.log(data, 'sadfas');
        // !! testing rendering loading to be removed!
        // setTimeout(function() {
        dispatch(receiveAllEvents(allEvents));
        // }, 5000);
    } catch (error) {
        dataEvents.events = null;
        dataEvents.isQueryEventSuccess = false;
        // setTimeout(function() {
        dispatch(receiveAllEvents(dataEvents));
        // }, 5000);
    }
};
export const filterEvents = (client, char) => async (dispatch) => {
    const dataEvents = {
        events: [],
        isQueryEventSuccess: false,
    };
    dispatch(receiveAllEvents(dataEvents));

    try {
        const response = await client.query({
            query: queryFilterEvents,
            variables: {
                char: char,
            },
        });
        const data = await response.data.filterEvent;
        dataEvents.events = data;
        dataEvents.isQueryEventSuccess = true;
        dispatch(receiveAllEvents(dataEvents));
    } catch (error) {
        dataEvents.events = null;
        dataEvents.isQueryEventSuccess = false;
        dispatch(receiveAllEvents(dataEvents));
    }
};
