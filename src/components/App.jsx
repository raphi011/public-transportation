import 'grommet/grommet.min.css';

import React, { PropTypes } from 'react';
import Container from 'grommet/components/App';
import Header from 'grommet/components/Header';
import Box from 'grommet/components/Box';
import Title from 'grommet/components/Title';
import Columns from 'grommet/components/Columns';
import Select from 'grommet/components/Select';
import Heading from 'grommet/components/Heading';
import { connect } from 'react-redux';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';



import * as actions from '../actions';

const App = ({ stations, select, schedules }) => {
  const selectTo = ({ option }) => (
    select('SELECT_TO', option)
  );
  const selectFrom = ({ option }) => (
    select('SELECT_FROM', option)
  );

  return (
    <Container>
      <Header pad="small" colorIndex="brand">
        <Title>Public Transportation</Title>
      </Header>
      <Box pad="small">
        <Columns maxCount={2} justify="between">
          <Box align="center">
            <div>
              <Heading tag="h2">
                From
              </Heading>
              <Select
                placeHolder="Search"
                options={stations.list}
                value={stations.from}
                onChange={selectFrom}
                />
            </div>
          </Box>
          <Box align="center">
            <div>
              <Heading tag="h2">
                To
              </Heading>
              <Select
                placeHolder="Search"
                options={stations.list}
                value={stations.to}
                onChange={selectTo}
                />
            </div>
          </Box>
        </Columns>
      </Box>
      <Table>
        <thead>
          <tr>
            <th>Departure</th>
            <th>Arrival</th>
          </tr>
        </thead>
        <tbody>{schedules ? schedules.map((s, i) => (
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
    </Container>
  );
};

App.propTypes = {
  schedules: PropTypes.array,
  stations: PropTypes.object,
  select: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ stations: state.stations, schedules: state.schedules });

export default connect(
  mapStateToProps,
  { select: actions.select })(App);
