import { combineReducers } from 'redux';
import { START_GAME } from '../actions';

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

const rootReducer = combineReducers({ startReducer });

export default rootReducer;
