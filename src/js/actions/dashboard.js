import { DASHBOARD_LOAD, DASHBOARD_UNLOAD } from '../actions';
// import { watchDashboard, unwatchDashboard } from '../api/dashboard';
import { getMachines } from '../api/machines';

export function loadDashboard() {
  return dispatch => (
    getMachines()
      .then((payload) => {
        dispatch({ type: DASHBOARD_LOAD, payload });
      })
  );
}

export function unloadDashboard() {
  // unwatchDashboard();
  return { type: DASHBOARD_UNLOAD };
}
