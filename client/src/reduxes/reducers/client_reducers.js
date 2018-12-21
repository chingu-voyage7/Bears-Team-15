const CLIENT_GRAPHQL = "CLIENT_GRAPHQL";

export default function modalReducer(state = {}, action) {
 switch (action.type) {
  case CLIENT_GRAPHQL:
   return action.modal;
  default:
   return state;
 }
}
