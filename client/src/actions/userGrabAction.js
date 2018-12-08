const QUERY_ALL_USERS = 'QUERY_ALL_USERS';
// test grab users
export const getAllUsers = (args) => {
  console.log(args, 'action');
  // args will be expecting an array of users
  return {
    type: QUERY_ALL_USERS,
    payload: args,
  };
};
