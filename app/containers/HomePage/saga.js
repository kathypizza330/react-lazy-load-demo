import {
  call,
  put,
  select,
  takeLatest,
  fork,
  take,
  all,
} from 'redux-saga/effects';
import { SEND_MESSAGE } from 'containers/App/constants';
import { sendMessageSuccess, sendMessageError } from 'containers/App/actions';

import { makeSelectInput } from 'containers/HomePage/selectors';
import { receivedMessage } from './actions';

export function* sendMessageSaga({ sendMessage }) {
  // // Select username from store
  // const input = yield select(makeSelectInput());

  // try {
  //   yield call(sendMessage, input);
  //   yield put(sendMessageSuccess());
  // } catch (err) {
  //   yield put(sendMessageError(err));
  // }
}

export function* webSocketListenerSaga({ createSocketChannel }) {
  // const chan = yield call(createSocketChannel);
  // while (true) {
  //   const received = yield take(chan);
  //   yield put(receivedMessage(received));
  // }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* homePageSaga() {

  yield all([
    // takeLatest(SEND_MESSAGE, sendMessageSaga, webSocketAdapter),
    // fork(webSocketListenerSaga, webSocketAdapter),
  ]);
}
