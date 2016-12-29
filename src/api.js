import fetch from 'isomorphic-fetch';

const apiConfig = require('../transport-api');

const apiUrl = 'https://transportapi.com/v3/uk/train/';

const buildUrl = (config, resourceUrl, params) => {
  const url = `${apiUrl}${resourceUrl}?app_id=${config.app_id}&app_key=${config.app_key}`;

  const paramUrl = params.reduce((a, b) => a + `&${b.key}=${b.value}`, '');

  return url + paramUrl;
};

const nearApiUrl = buildUrl(apiConfig, 'stations/near.json', [
  { key: 'lat', value: '51.507513' },
  { key: 'lon', value: '-0.126971' },
]);

export function getSchedule(from, to) {
  const url = buildUrl(apiConfig, `station/${from}/2016-12-12/12:00/timetable.json`, [
    { key: 'calling_at', value: to },
    { key: 'train_status', value: 'passenger' },
  ]);

  console.log(url);

  return fetch(url)
    .then(response => response.json())
    .then((json) => {
      console.log(json);

      return json.departures.all.map(s => ({
        departure: s.aimed_departure_time,
        arrival: s.aimed_arrival_time,
      }));
    });
}

export function getStations() {
  return fetch(nearApiUrl)
    .then(response => response.json())
    .then(json => json.stations.map(s => ({
      value: s.station_code, label: s.name,
    })));
}
