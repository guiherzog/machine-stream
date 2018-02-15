import { MACHINES_LOAD, MACHINES_UNLOAD, MACHINE_LOAD, MACHINE_UNLOAD } from '../actions';
import { createReducer } from './utils';

const initialState = {
  machines: [],
  machine: undefined
};

const handlers = {
  [MACHINES_LOAD]: (state, action) => {
    if (!action.error) {
      action.payload.error = undefined;
      return { machines: action.payload.data };
    }
    return { error: action.payload };
  },
  [MACHINES_UNLOAD]: () => initialState,
  [MACHINE_LOAD]: (state, action) => {
    if (!action.error) {
      action.payload.error = undefined;
      return { machine: action.payload };
    }
    return { error: action.payload };
  },
  [MACHINE_UNLOAD]: () => initialState
};

export default createReducer(initialState, handlers);
