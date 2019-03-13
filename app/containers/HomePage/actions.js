import { CHANGE_INPUT, RECEIVE_MESSAGE } from './constants';

export function changeInput(input) {
  return {
    type: CHANGE_INPUT,
    input,
  };
}

export function receivedMessage(message) {
  return {
    type: RECEIVE_MESSAGE,
    message,
  };
}
