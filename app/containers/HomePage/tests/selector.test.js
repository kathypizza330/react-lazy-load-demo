import { fromJS } from 'immutable';

import { makeSelectInput, makeSelectMessage } from '../selectors';

describe('HomePage selectors', () => {
  it('makeSelectInput should select input from home state', () => {
    const input = 'Mock Input';
    const mockedState = fromJS({
      home: {
        input,
      },
    });
    expect(makeSelectInput()(mockedState)).toEqual(input);
  });

  it('makeSelectMessage should select message from home state', () => {
    const message = 'Mock message';
    const mockedState = fromJS({
      home: {
        message,
      },
    });
    expect(makeSelectMessage()(mockedState)).toEqual(message);
  });
});
