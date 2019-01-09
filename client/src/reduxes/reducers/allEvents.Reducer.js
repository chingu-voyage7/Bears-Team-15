import {ALL_EVENTS} from '../actions/types';

const getAllEvents = (state = [], action) => {
    switch (action.type) {
        case ALL_EVENTS:
            console.log(action, 'actionn');
            return action.payload;
        default:
            return state;
    }
};

export default getAllEvents;
