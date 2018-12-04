import {INCREMENT} from './types';

export const increment = (args)=>{
  const sum = args + 1;
  return {
    type: INCREMENT,
    payload: sum,
  };
};
