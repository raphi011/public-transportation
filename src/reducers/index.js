import { combineReducers } from 'redux';

import stations from './stations';
import schedules, { getSchedule } from './schedules';

export { getSchedule };

export default combineReducers({
  stations,
  schedules,
});
