import { ADD_NAME, ADD_EMAIL } from './actionTypes';

export const addName = (name) => ({
  type: ADD_NAME,
  payload: {
    name,
  },
});

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: {
    email,
  },
});
