import { EVENTS_NEW, EVENTS_UNLOAD } from '../actions';
import {
  watchEvents, unwatchEvents
} from '../api/events';

export function loadEvents() {
  return dispatch => (
    watchEvents()
      .on('new',
        payload => dispatch({ type: EVENTS_NEW, payload })
      )
  );
}

export function unloadEvents() {
  unwatchEvents();
  return { type: EVENTS_UNLOAD };
}
