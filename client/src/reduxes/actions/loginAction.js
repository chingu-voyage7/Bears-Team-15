

export const login = (args) => {
  console.log(args, 'action')
  return {
    type: 'LOG_IN',
    payload: args,
  };
};