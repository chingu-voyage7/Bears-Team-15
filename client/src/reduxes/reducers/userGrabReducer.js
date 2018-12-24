const QUERY_ALL_USERS = 'QUERY_ALL_USERS';

// ! all query should go here
export default function(state = [], action) {
  switch (action.type) {
    case QUERY_ALL_USERS:
      return action.payload;
    default:
      return state;
  }
}
