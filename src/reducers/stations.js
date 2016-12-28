const stations = (state = { list: [] }, action) => {
  switch (action.type) {
    case 'SELECT_FROM':
      return {
        ...state,
        from: action.station,
      };
    case 'SELECT_TO':
      return {
        ...state,
        to: action.station,
      };
    case 'REQUEST_STATIONS':
      return {
        ...state,
        isFetching: true,
      };
    case 'RECEIVE_STATIONS':
      return {
        ...state,
        isFetching: false,
        list: action.stations,
      };
    default:
      return state;
  }
};

export default stations;
