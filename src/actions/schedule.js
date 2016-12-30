import { getSchedule } from '../api';

export function fetchSchedule(from, to) {
  return (dispatch) => {
    dispatch({
      type: 'REQUEST_SCHEDULE',
      from,
      to,
    });
    return getSchedule(from, to)
      .then((schedule) => {
        dispatch({
          type: 'RECEIVE_SCHEDULE',
          from,
          to,
          schedule,
        });
      }, (e) => {
        dispatch({
          type: 'ERROR_SCHEDULE',
          from,
          to,
          error: e,
        });
      });
  };
}
