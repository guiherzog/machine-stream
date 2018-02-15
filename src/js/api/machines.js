import { headers, parseJSON } from './utils';

export function getMachines() {
  const options = {
    headers: headers(),
    method: 'GET',
  };

  return fetch('https://machinestream.herokuapp.com/api/v1/machines', options)
    .then(parseJSON);
}

export function getMachine(id) {
  const options = {
    headers: headers(),
    method: 'GET',
  };

  return fetch(`https://machinestream.herokuapp.com/api/v1/machines/${id}`, options)
    .then(parseJSON);
}
