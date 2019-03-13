/**
 * Tests for HomePage sagas
 */
import { all, takeLatest, fork, select, call, put } from 'redux-saga/effects';

import { SEND_MESSAGE } from 'containers/App/constants';
import { sendMessageSuccess, sendMessageError } from 'containers/App/actions';

import { makeSelectInput } from '../selectors';
import homePageSaga, { sendMessageSaga, webSocketListenerSaga } from '../saga';
import WebSocketAdapter from '../WebSocketAdapter';
import WebSocket from './helper/MockWebSocket';
import { receivedMessage } from '../actions';

/* eslint-disable redux-saga/yield-effects */
describe('homePageSaga Saga', () => {
  const homePageSagaReference = homePageSaga();

  it('should take listen to  SEND_MESSAGE', async () => {
    const webSocketAdapter = new WebSocketAdapter();
    const takeAllDescriptor = homePageSagaReference.next().value;

    expect(JSON.stringify(takeAllDescriptor)).toEqual(
      JSON.stringify(
        all([
          takeLatest(SEND_MESSAGE, sendMessageSaga, webSocketAdapter),
          fork(webSocketListenerSaga, webSocketAdapter),
        ]),
      ),
    );
  });

  describe('sendMessageSaga Generator', () => {
    const webSocketAdapter = new WebSocketAdapter();
    let sendMessageSagaGenerator;
    const input = 'Mock Input';

    beforeEach(() => {
      sendMessageSagaGenerator = sendMessageSaga(webSocketAdapter);
    });

    it('should select input first', () => {
      const selectInputDescriptor = sendMessageSagaGenerator.next().value;
      expect(JSON.stringify(selectInputDescriptor)).toEqual(
        JSON.stringify(select(makeSelectInput())),
      );
    });

    it('should call sendMessage with input and put sendMessageSuccess on success', () => {
      // Yield Select
      sendMessageSagaGenerator.next();

      const callSendMessageDescriptor = sendMessageSagaGenerator.next(input)
        .value;
      expect(callSendMessageDescriptor).toEqual(
        call(webSocketAdapter.sendMessage, input),
      );
      const putSuccessDescriptor = sendMessageSagaGenerator.next().value;
      expect(putSuccessDescriptor).toEqual(put(sendMessageSuccess()));
    });

    it('should put sendMessageError on error', () => {
      const error = new Error('Test error');
      // Yield select
      sendMessageSagaGenerator.next();
      // Yield call
      sendMessageSagaGenerator.next();
      const errorDescriptor = sendMessageSagaGenerator.throw(error).value;
      expect(errorDescriptor).toEqual(put(sendMessageError(error)));
    });
  });

  describe('webSocketListenerSaga Generator', () => {
    const webSocketAdapter = new WebSocketAdapter();
    let webSocketListenerSagaGenerator;
    const websocket = WebSocket;
    webSocketAdapter.websocket = websocket;

    it('should put receivedMessage when received message from websocket', async () => {
      const data = 'test message';
      webSocketListenerSagaGenerator = webSocketListenerSaga(webSocketAdapter);
      const callResult = webSocketListenerSagaGenerator.next().value;

      const chan = callResult.CALL.fn();
      const taken = new Promise(resolve => chan.take(resolve));

      websocket.onmessage({ data });

      const value = await taken;
      expect(value).toEqual(data);

      webSocketListenerSagaGenerator.next(chan);
      expect(webSocketListenerSagaGenerator.next(data).value).toEqual(
        put(receivedMessage(data)),
      );
    });
  });
});
