import {
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_ERROR,
} from './constants';

export function sendMessage() {
  return {
    type: SEND_MESSAGE,
  };
}

export function sendMessageSuccess() {
  return {
    type: SEND_MESSAGE_SUCCESS,
  };
}

export function sendMessageError(error) {
  return {
    type: SEND_MESSAGE_ERROR,
    error,
  };
}
