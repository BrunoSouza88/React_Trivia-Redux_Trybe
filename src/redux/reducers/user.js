import { ADD_NAME, ADD_EMAIL } from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_NAME:
    return {
      ...state,
      name: action.payload,
    };

  case ADD_EMAIL:
    return {
      ...state,
      email: action.payload,
    };

  default:
    return state;
  }
};

export default user;
