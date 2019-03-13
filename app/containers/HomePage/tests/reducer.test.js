import { fromJS } from 'immutable';
import homePageReducer, { initialState } from '../reducer';
import { changeInput, receivedMessage } from '../actions';

describe('homePageReducer', () => {
  it('should return the initial state', () => {
    expect(homePageReducer(undefined, {})).toEqual(initialState);
  });

  it('should update input in substate upon changeInput', () => {
    const input = 'Mock Input';
    const expectedResult = fromJS({
      input,
      message: '',
    });
    expect(homePageReducer(initialState, changeInput(input))).toEqual(
      expectedResult,
    );
  });

  it('should update message in substate upon receivedMessage', () => {
    const message = 'Mock Message';
    const expectedResult = fromJS({
      input: '',
      message,
    });
    expect(homePageReducer(initialState, receivedMessage(message))).toEqual(
      expectedResult,
    );
  });
});
