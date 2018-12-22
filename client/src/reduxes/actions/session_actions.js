
export const login = (args) => {
  return {
    type: 'LOG_IN',
    payload: args
  };
};

export const signup = (args) => {
  return {
    type: 'SIGN_UP',
    payload: args
  };
};
