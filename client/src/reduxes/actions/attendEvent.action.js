import * as types from './types';
import {attendEvent} from '../../util/graphQLQuery';

export const attendEvent = (args) => {
    return {
        type: types.ATTEND_EVENT,
        payload: {
            attendEvent: args.attendEvent,
            isAttendSuccess: args.isAttendSuccess,
        },
    };
};

export const filterEvents = (client, char) => async (dispatch) => {
    const dataEvents = {
        events: [],
        isAttendSuccess: false,
    };
    dispatch(attendEvent(dataEvents));

    try {
        const response = await client.query({
            query: attendEvent,
            variables: {
                char: char,
            },
        });

        dispatch(attendEvent(response));
    } catch (error) {
        dispatch(attendEvent(dataEvents));
    }
};
