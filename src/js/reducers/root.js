import { combineReducers } from 'redux';

import dashboard from './dashboard';
import nav from './nav';
import session from './session';
import machines from './machines';
import events from './events';

export default combineReducers({
  dashboard,
  nav,
  session,
  machines,
  events,
});
