import * as types from './types';

export const UserAttendEvent = (args) => {
    return {
        type: types.ATTEND_EVENT,
        payload: {
            attendEvent: args.attendEvent,
            isAttendSuccess: args.isAttendSuccess,
        },
    };
};

export const userUnattendEvent = (args) => {
    return {
        type: types.ATTEND_EVENT,
        payload: {
            attendEvent: args.attendEvent,
            isAttendSuccess: args.isAttendSuccess,
        },
    };
};

export const userHandleAttendAction = (gqlQuery, gqlData) => async (
    dispatch
) => {
    const {variables, refetchQueries} = gqlData;

    try {
        const attendee = await gqlQuery({
            variables,
            refetchQueries,
        });
        console.log(attendee);
    } catch (error) {
        return error;
    }
};
