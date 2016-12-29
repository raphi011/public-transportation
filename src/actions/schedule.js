import { getSchedule } from '../api';

export const requestSchedule = () => ({
  type: 'REQUEST_SCHEDULE',
});

export const receiveSchedule = schedule => ({
  type: 'RECEIVE_SCHEDULE',
  schedule,
});

export function fetchSchedule(from, to) {
  return (dispatch) => {
    dispatch(requestSchedule());
    return getSchedule(from, to)
      .then(schedule => dispatch(receiveSchedule(schedule)));
  };
}
