import { getStations } from '../api';
import { fetchSchedule } from './schedule';

const requestStations = () => ({
  type: 'REQUEST_STATIONS',
});

const receiveStations = stations => ({
  type: 'RECEIVE_STATIONS',
  stations,
});

export const select = (type, station) => {
  return (dispatch, getState) => {
    const { stations } = getState();

    dispatch({
      type,
      station,
    });

    if (stations.to && stations.from) {
      fetchSchedule(stations.from.value, stations.to.value)(dispatch);
    }
  }
}

export function fetchStations() {
  return (dispatch) => {
    dispatch(requestStations());
    return getStations()
      .then(stations => dispatch(receiveStations(stations)));
  };
}
