

export const login = (args) => {
  const credentials = args
  return {
    type: 'LOG_IN',
    payload: credentials,
  };
};