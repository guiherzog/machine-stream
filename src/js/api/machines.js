import { headers, parseJSON } from './utils';

// Returns basic information of all machines.
export function getMachines() {
  const options = {
    headers: headers(),
    method: 'GET',
  };

  return fetch('https://machinestream.herokuapp.com/api/v1/machines', options)
    .then(parseJSON);
}

// Returns all information of a specific machine including it's 10 last events.
export function getMachine(id) {
  const options = {
    headers: headers(),
    method: 'GET',
  };

  return fetch(`https://machinestream.herokuapp.com/api/v1/machines/${id}`, options)
    .then(parseJSON);
}
