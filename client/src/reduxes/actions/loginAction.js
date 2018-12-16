

export const login = (args) => {
  return {
    type: 'LOG_IN',
    payload: args,
  };
};