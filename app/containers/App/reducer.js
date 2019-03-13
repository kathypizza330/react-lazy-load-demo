import { fromJS } from 'immutable';

import {
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE,
  SEND_MESSAGE_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_MESSAGE:
      return state.set('loading', true).set('error', false);
    case SEND_MESSAGE_SUCCESS:
      return state.set('loading', false);
    case SEND_MESSAGE_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
