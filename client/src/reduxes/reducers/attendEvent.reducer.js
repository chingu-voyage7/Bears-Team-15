import {ATTEND_EVENT} from '../actions/types';

const attendEvent = (state = {events: [], isAttendSuccess: false}, action) => {
    switch (action.type) {
        case ATTEND_EVENT:
            return action.payload;
        default:
            return state;
    }
};

export default attendEvent;
