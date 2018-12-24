const AUTHENTICATION = "AUTHENTICATION";

export default function (state = false, action) {
  switch (action.type) {
    case AUTHENTICATION:
      return action.payload;
    default:
      return state;
  }
}