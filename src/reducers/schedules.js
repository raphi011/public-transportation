const getKey = (from, to) => `${from}-${to}`;

const schedules = (state = {}, action) => {
  if (!action.to || !action.from) return state;

  const key = getKey(action.from, action.to);

  switch (action.type) {
    case 'REQUEST_SCHEDULE':
      return {
        ...state,
        [key]: {
          list: [],
          ...state[key],
          isFetching: true,
          error: null,
        },
      };
    case 'ERROR_SCHEDULE':
      return {
        ...state,
        [key]: {
          ...state[key],
          isFetching: false,
          error: action.error,
        },
      };
    case 'RECEIVE_SCHEDULE':
      return {
        ...state,
        [key]: {
          isFetching: false,
          list: action.schedule,
          error: null,
        },
      };
    default:
      return state;
  }
};


export default schedules;

export const getSchedule = (state, from, to) => state[getKey(from, to)];
