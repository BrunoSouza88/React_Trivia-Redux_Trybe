import { ADD_NAME, ADD_EMAIL } from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const User = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_NAME:
    return {
      name: action.payload.name,
    };

  case ADD_EMAIL:
    return {
      email: action.payload.email,
    };

  default:
    return state;
  }
};

export default User;
