const AUTHENTICATION = "AUTHENTICATION";

export const auth = (args) => {
  return {
    type: AUTHENTICATION,
    payload: args,
  };
};


