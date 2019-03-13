import { eventChannel, END } from 'redux-saga';

export default class WebSocketAdapter {
  constructor() {
    this.createSocketChannel = this.createSocketChannel.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.websocket = new WebSocket('ws://echo.websocket.org');
  }

  createSocketChannel() {
    // `eventChannel` takes a subscriber function
    // the subscriber function takes an `emit` argument to put messages onto the channel
    return eventChannel(emit => {
      this.websocket.onopen = () => {
        emit('CONNECTED');
      };

      this.websocket.onclose = () => {
        emit(END);
      };

      this.websocket.onmessage = message => {
        emit(message.data);
      };

      return () => {};
    });
  }

  sendMessage(messageToSend) {
    this.websocket.send(messageToSend);
  }
}
