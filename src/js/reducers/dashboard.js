import { DASHBOARD_LOAD, DASHBOARD_UNLOAD } from '../actions';
import { createReducer } from './utils';

const initialState = {
  machines: []
};

const handlers = {
  [DASHBOARD_LOAD]: (state, action) => {
    if (!action.error) {
      action.payload.error = undefined;
      return { machines: action.payload.data };
    }
    return { error: action.payload };
  },
  [DASHBOARD_UNLOAD]: () => initialState
};

export default createReducer(initialState, handlers);
