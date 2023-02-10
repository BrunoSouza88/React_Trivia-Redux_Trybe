import { combineReducers } from 'redux';
import { START_GAME } from '../actions';
import user from './user';

const INITIAL_STATE = {
  token: '',
};

const startReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case START_GAME:
    return {
      token: action.payload,
    };
  default:
    return state;
  }
};

const rootReducer = combineReducers({ startReducer, user });

export default rootReducer;
