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

import * as actions from '../actions';

const App = ({ stations, onSelectTo, onSelectFrom }) => {
  const selectTo = ({ option }) => (
    onSelectTo(option)
  );
  const selectFrom = ({ option }) => (
    onSelectFrom(option)
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
                Arrival
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
    </Container>
  );
};

App.propTypes = {
  stations: PropTypes.object,
  onSelectFrom: PropTypes.func.isRequired,
  onSelectTo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ stations: state.stations });

export default connect(
  mapStateToProps,
  {
    onSelectFrom: actions.selectFrom,
    onSelectTo: actions.selectTo,
  })(App);
