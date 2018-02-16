import { Socket } from 'phoenix';

// Open Socket connection
const socket = new Socket('ws://machinestream.herokuapp.com/api/v1/events');
socket.connect();

let channel;

export function watchEvents() {
  channel = socket.channel('events', {});
  channel.join();

  console.log(channel);
  return channel;
}

export function unwatchEvents() {
  if (channel) {
    channel.terminate();
  }
}
