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

import Schedule from './Schedule';
import * as actions from '../actions';

const App = ({ stations, selectTo, selectFrom }) => {
  const onSelectTo = ({ option }) => (
    selectTo(option)
  );
  const onSelectFrom = ({ option }) => (
    selectFrom(option)
  );

  return (
    <Container>
      <Header pad="small" colorIndex="brand">
        <Title>Public Transportation</Title>
      </Header>
      <Box pad="small" >
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
                onChange={onSelectFrom}
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
                onChange={onSelectTo}
                />
            </div>
          </Box>
        </Columns>
      </Box>
      <Box align="center" pad="medium">
        <Schedule />
      </Box>
    </Container>
  );
};

App.propTypes = {
  stations: PropTypes.object,
  selectTo: PropTypes.func.isRequired,
  selectFrom: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ stations: state.stations });

export default connect(
  mapStateToProps,
  {
    selectTo: actions.selectTo,
    selectFrom: actions.selectFrom,
  })(App);
