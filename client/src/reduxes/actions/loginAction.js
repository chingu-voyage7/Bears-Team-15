
const LOG_IN = 'LOG_IN';

export const login = (args) => {
  console.log('action');
  return {
    type: LOG_IN,
    payload: args,
  };
};