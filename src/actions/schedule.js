import { getSchedule } from '../api';

export const requestSchedule = (from, to) => ({
  type: 'REQUEST_SCHEDULE',
  from,
  to,
});

export const receiveSchedule = (from, to, schedule) => ({
  type: 'RECEIVE_SCHEDULE',
  from,
  to,
  schedule,
});

export function fetchSchedule(from, to) {
  return (dispatch) => {
    dispatch(requestSchedule(from, to));
    return getSchedule(from, to)
      .then(schedule => dispatch(receiveSchedule(from, to, schedule)));
  };
}
