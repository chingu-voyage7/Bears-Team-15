import {ALL_EVENTS} from '../actions/types';

const getAllEvents = (state = [], action) => {
    switch (action.type) {
        case ALL_EVENTS:
            return action.payload;
        default:
            return state;
    }
};

export default getAllEvents;
