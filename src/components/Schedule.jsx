import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Spinning from 'grommet/components/icons/Spinning';
import Heading from 'grommet/components/Heading';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';

import { getSchedule } from '../reducers';

const Schedule = ({ stations, schedules }) => {
  if (!stations.to || !stations.from) {
    return <Heading tag="h2">Please select the departure and target stations</Heading>;
  }

  const schedule = getSchedule(schedules, stations.from.value, stations.to.value);

  // TODO: show cached schedule

  if (schedule.isFetching && !schedule.list.length) {
    return <Spinning />;
  } else if (!schedule.list.length) {
    return <Heading tag="h2">No Schedule Available for these Stations</Heading>;
  }

  return (
    <Table style={{ maxWidth: '500px' }}>
      <thead>
        <tr>
          <th>Departure</th>
          <th>Arrival</th>
        </tr>
      </thead>
      <tbody>{schedule.list ? schedule.list.map((s, i) => (
        <TableRow key={i}>
          <td>
            {s.departure}
          </td>
          <td>
            {s.arrival}
          </td>
        </TableRow>
      )) : ''}</tbody>
    </Table>
  );
};

Schedule.propTypes = {
  stations: PropTypes.object,
  schedules: PropTypes.object,
};

const mapStateToProps = state => ({
  stations: state.stations,
  schedules: state.schedules,
});

export default connect(mapStateToProps)(Schedule);
