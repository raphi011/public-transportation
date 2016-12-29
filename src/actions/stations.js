import { getStations } from '../api';
import { fetchSchedule } from './schedule';

const select = type => station => (dispatch, getState) => {
  const { stations } = getState();

  dispatch({
    type,
    station,
  });

  if (!station) return;

  if (type === 'SELECT_TO' && stations.from) {
    dispatch(fetchSchedule(stations.from.value, station.value));
  } else if (type === 'SELECT_FROM' && stations.to) {
    dispatch(fetchSchedule(station.value, stations.to.value));
  }
};

export const selectTo = select('SELECT_TO');

export const selectFrom = select('SELECT_FROM');

export function fetchStations() {
  return (dispatch) => {
    dispatch({
      type: 'REQUEST_STATIONS',
    });

    return getStations()
      .then(stations => dispatch({
        type: 'RECEIVE_STATIONS',
        stations,
      }));
  };
}
