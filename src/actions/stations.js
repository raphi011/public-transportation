import fetch from 'isomorphic-fetch';

const apiConfig = require('../../transport-api');

const apiUrl = `https://transportapi.com/v3/uk/train/stations/near.json?app_id=${apiConfig.appid}&app_key=${apiConfig.key}&lat=${apiConfig.lat}&lon=${apiConfig.lon}`;

export const requestStations = () => ({
  type: 'REQUEST_STATIONS',
});

export const receiveStations = stations => ({
  type: 'RECEIVE_STATIONS',
  stations,
});

export const selectTo = station => ({
  type: 'SELECT_TO',
  station,
});

export const selectFrom = station => ({
  type: 'SELECT_FROM',
  station,
});

export function fetchStations() {
  return (dispatch) => {
    dispatch(requestStations());
    return fetch(apiUrl)
      .then(response => response.json())
      .then(json => json.stations.map(s => ({
        value: s.station_code, label: s.name,
      })))
      .then(stations => dispatch(receiveStations(stations)));
  };
}
