import { END } from 'redux-saga';
import WebSocket from './helper/MockWebSocket';
import WebSocketAdapter from '../WebSocketAdapter';

describe('WebSocketAdapter', () => {
  const webSocketAdapter = new WebSocketAdapter();
  const websocket = WebSocket;

  beforeAll(() => {
    webSocketAdapter.websocket = websocket;
  });

  it('should emit connected on open', async () => {
    const channel = webSocketAdapter.createSocketChannel();
    const taken = new Promise(resolve => channel.take(resolve));
    websocket.onopen();
    const value = await taken;
    expect(value).toEqual('CONNECTED');
  });

  it('should receive message from websocket', async () => {
    const data = 'test message';
    const channel = webSocketAdapter.createSocketChannel();
    const taken = new Promise(resolve => channel.take(resolve));
    websocket.onmessage({ data });
    const value = await taken;
    expect(value).toEqual(data);
  });

  it('should emit END when websocket closes', async () => {
    const channel = webSocketAdapter.createSocketChannel();
    const taken = new Promise(resolve => channel.take(resolve));
    websocket.onclose();
    const value = await taken;
    expect(value).toEqual(END);
  });

  it('should send message to websocket on sendMessage', async () => {
    webSocketAdapter.sendMessage('message');
    expect(websocket.send).toHaveBeenCalledWith('message');
  });
});
