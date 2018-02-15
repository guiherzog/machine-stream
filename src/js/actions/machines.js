import { MACHINE_LOAD, MACHINES_LOAD } from '../actions';
import { getMachines, getMachine } from '../api/machines';

export function loadMachines() {
  return dispatch => (
    getMachines()
      .then((payload) => {
        dispatch({ type: MACHINES_LOAD, payload });
      })
  );
}

export function loadMachine(id) {
  return dispatch => (
    getMachine(id)
      .then((payload) => {
        dispatch({ type: MACHINE_LOAD, payload });
      })
  );
}
