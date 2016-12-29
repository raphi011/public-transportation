const schedules = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_SCHEDULE':
      return action.schedule;
    case 'REQUEST_SCHEDULE':
    default:
      return state;
  }
};

export default schedules;
