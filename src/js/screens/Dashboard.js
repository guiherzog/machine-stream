import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Notification from 'grommet/components/Notification';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Title from 'grommet/components/Title';
import Spinning from 'grommet/components/icons/Spinning';
import Distribution from 'grommet/components/Distribution';
import AnnotatedMeter from 'grommet-addons/components/AnnotatedMeter';

import NavControl from '../components/NavControl';
import { loadDashboard } from '../actions/dashboard';

import { pageLoaded } from './utils';


// Render a graphic showing how many are microscopes and how many are measurement machines
function renderMachineDistribution() {
  return (
    <Tile fill>
      <Distribution
        full
        size='small'
        series={[{
          label: 'Total Microscopes',
          value: 12,
          colorIndex: 'accent-1',
        }, {
          label: 'Total Measurement Machines',
          value: 16,
          colorIndex: 'accent-2',
        }]}
      />
    </Tile>);
}

class Dashboard extends Component {
  componentDidMount() {
    pageLoaded('Dashboard');
    this.props.dispatch(loadDashboard());
  }

  render() {
    const { error, machines } = this.props;

    console.log(machines);

    let errorNode;
    if (error) {
      errorNode = (
        <Notification
          status='critical'
          size='large'
          state={error.message}
          message='An unexpected error happened, please try again later'
        />
      );
    }

    return (
      <Article primary={true}>
        <Header
          direction='row'
          justify='between'
          size='large'
          pad={{ horizontal: 'small', between: 'small' }}
        >
          <NavControl />
          <Title>
            Dashboard
          </Title>
        </Header>
        {errorNode}
        <Box pad='medium'>
          <Box
            direction='row'
            responsive={false}
            pad={{ between: 'small', horizontal: 'medium', vertical: 'medium' }}
          >
            <Spinning /><span>Monitoring for errors...</span>
          </Box>
        </Box>
        <Tiles fill={true}>
          <Box
            responsive={false}
            align='center'
            pad={{ between: 'small', horizontal: 'medium', vertical: 'medium' }}
          >
            <Title>
              Status
            </Title>
            <AnnotatedMeter
              legend={true}
              size='small'
              type='circle'
              max={28}
              series={[
                { label: 'Running', value: 15, colorIndex: 'ok' },
                { label: 'Idle', value: 4, colorIndex: 'unknown' },
                { label: 'Errored', value: 4, colorIndex: 'critical' },
                { label: 'Repaired', value: 5, colorIndex: 'graph-2' }
              ]}
            />
          </Box>
          {renderMachineDistribution()}
        </Tiles>
      </Article>
    );
  }
}

Dashboard.defaultProps = {
  error: undefined,
  machines: []
};

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object,
  machines: PropTypes.arrayOf(PropTypes.object)
};

const select = state => ({ ...state.machines });

export default connect(select)(Dashboard);
