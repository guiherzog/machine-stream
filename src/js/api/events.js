import RequestWatcher from './request-watcher';

let protocol = 'ws:';
if (window.location.protocol === 'https:') {
  protocol = 'wss:';
}
const host = 'machinestream.herokuapp.com';
const webSocketUrl = `${protocol}//${host}`;

const socketWatcher = new RequestWatcher({ webSocketUrl });

let eventsWatcher;

export function watchEvents() {
  eventsWatcher = socketWatcher.watch('/api/v1/events');
  return eventsWatcher;
}

export function unwatchEvents() {
  if (eventsWatcher) {
    eventsWatcher.stop();
  }
}
