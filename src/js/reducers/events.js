import { EVENTS_NEW, EVENTS_UNLOAD } from '../actions';
import { createReducer } from './utils';

const initialState = {
  events: [],
  event: undefined
};

const handlers = {
  [EVENTS_NEW]: (state, action) => {
    if (!action.error) {
      action.payload.error = undefined;
      const events = [action.payload, ...state.events];
      return { events };
    }
    return { error: action.payload };
  },
  [EVENTS_UNLOAD]: () => initialState,
};

export default createReducer(initialState, handlers);
