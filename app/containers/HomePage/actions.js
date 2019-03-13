import { CHANGE_INPUT, RECEIVE_MESSAGE } from './constants';

export function changeInput(name) {
  return {
    type: CHANGE_INPUT,
    name,
  };
}

export function receivedMessage(message) {
  return {
    type: RECEIVE_MESSAGE,
    message,
  };
}
