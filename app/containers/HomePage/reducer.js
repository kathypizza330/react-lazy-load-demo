import { fromJS } from 'immutable';

import { CHANGE_INPUT, RECEIVE_MESSAGE } from './constants';

// The initial state of the App
export const initialState = fromJS({
  username: '',
  message: '',
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_INPUT:
      return state.set('input', action.name);
    case RECEIVE_MESSAGE:
      return state.set('message', action.message);
    default:
      return state;
  }
}

export default homeReducer;
