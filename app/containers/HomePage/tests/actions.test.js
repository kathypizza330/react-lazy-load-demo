import { changeInput, receivedMessage } from '../actions';
import { CHANGE_INPUT, RECEIVE_MESSAGE } from '../constants';

describe('Test HomePage actions', () => {
  describe('changeInput Action', () => {
    it('has a type of CHANGE_INPUT and a input', () => {
      const input = 'Mock Input';
      const expected = {
        type: CHANGE_INPUT,
        input,
      };
      expect(changeInput(input)).toEqual(expected);
    });
  });

  describe('receivedMessage Action', () => {
    it('has a type of RECEIVE_MESSAGE and a message', () => {
      const message = 'Mock Message';
      const expected = {
        type: RECEIVE_MESSAGE,
        message,
      };
      expect(receivedMessage(message)).toEqual(expected);
    });
  });
});
