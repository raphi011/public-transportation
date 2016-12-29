const getKey = (from, to) => `${from}-${to}`;

const schedules = (state = {}, action) => {
  switch (action.type) {
    case 'REQUEST_SCHEDULE':
      const key = getKey(action.from, action.to);
      return {
        ...state,
        [key]: {
          isFetching: true,
          list: [state.key].list || [],
        },
      };
    case 'RECEIVE_SCHEDULE':
      return {
        ...state,
        [getKey(action.from, action.to)]: {
          isFetching: false,
          list: action.schedule,
        },
      };
    default:
      return state;
  }
};


export default schedules;

export const getSchedule = (state, from, to) => state[getKey(from, to)];
