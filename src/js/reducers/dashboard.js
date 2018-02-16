import { DASHBOARD_LOAD, DASHBOARD_UNLOAD } from '../actions';
import { createReducer } from './utils';

const initialState = {
  machines: []
};

const handlers = {
  [DASHBOARD_LOAD]: (state, action) => {
    if (!action.error) {
      action.payload.error = undefined;
      const totalMaintenance = totalMaintenanceLastMonth(action.payload.data);
      return { machines: action.payload.data, totalMaintenanceLastHundredDays: totalMaintenance };
    }
    return { error: action.payload };
  },
  [DASHBOARD_UNLOAD]: () => initialState
};

const totalMaintenanceLastMonth = (machines) => {
  let total = 0;
  machines.forEach((machine) => {
    const today = new Date();
    const maintenanceDate = new Date(machine.last_maintenance);
    const timeDiff = Math.abs(today.getTime() - maintenanceDate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (diffDays <= 365) {
      total++;
    }
  });
  return total;
};
export default createReducer(initialState, handlers);
