import { combineReducers } from 'redux';

import stations from './stations';
import schedules from './schedules';

export default combineReducers({
  stations,
  schedules,
});
