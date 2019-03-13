import EventEmitter from 'events';
const MockWebSocket = new EventEmitter();
MockWebSocket.onopen = jest.fn().mockImplementation(() => {});
MockWebSocket.onclose = jest.fn().mockImplementation(() => {});
MockWebSocket.send = jest.fn().mockImplementation(() => {});

export default MockWebSocket;
