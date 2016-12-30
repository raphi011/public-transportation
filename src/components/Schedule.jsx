import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Spinning from 'grommet/components/icons/Spinning';
import Heading from 'grommet/components/Heading';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Status from 'grommet/components/icons/Status';

import { getSchedule } from '../reducers';

const Schedule = ({ stations, schedules }) => {
  if (!stations.to || !stations.from) {
    return <Heading tag="h2">Please select the departure and target stations</Heading>;
  }

  const schedule = getSchedule(schedules, stations.from.value, stations.to.value);

  if (schedule.list.length) {
    return (
      <Table style={{ maxWidth: '500px' }}>
        <thead>
          <tr>
            <th>Departure</th>
            <th>Arrival</th>
          </tr>
        </thead>
        <tbody>{schedule.list.map((s, i) => (
          <TableRow key={i}>
            <td>
              {s.departure}
            </td>
            <td>
              {s.arrival}
            </td>
          </TableRow>
        ))}</tbody>
      </Table>
    );
  }

  if (schedule.error) {
    return (
      <Heading>
        <Status value="warning" /> Could not retrieve the schedule.
      </Heading>
    );
  } else if (schedule.isFetching) {
    return <Spinning />;
  }

  return <Heading tag="h2">No Schedule Available for these Stations</Heading>;
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
