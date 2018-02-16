import RequestWatcher from './request-watcher';

const protocol = 'ws:';
const host = 'machinestream.herokuapp.com';
const webSocketUrl = `${protocol}//${host}`;

const socketWatcher = new RequestWatcher({ webSocketUrl });

let eventsWatcher;

export function watchEvents() {
  eventsWatcher = socketWatcher.watch('/api/v1/events');
  console.log(eventsWatcher);
  return eventsWatcher;
}

export function unwatchEvents() {
  if (eventsWatcher) {
    eventsWatcher.stop();
  }
}
