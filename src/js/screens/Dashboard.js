import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Paragraph from 'grommet/components/Paragraph';
import Notification from 'grommet/components/Notification';
import Tiles from 'grommet/components/Tiles';
import Title from 'grommet/components/Title';
import Section from 'grommet/components/Section';
import Distribution from 'grommet/components/Distribution';
import AnnotatedMeter from 'grommet-addons/components/AnnotatedMeter';

import NavControl from '../components/NavControl';
import { loadDashboard } from '../actions/dashboard';

import { pageLoaded } from './utils';

class Dashboard extends Component {
  componentDidMount() {
    pageLoaded('Dashboard');
    this.props.dispatch(loadDashboard());
  }

  renderMachineStatusChart() {
    const { machines } = this.props;
    if (!machines) {
      return null;
    }

    const totalRunning = machines.filter(machine => machine.status === 'running');
    const totalRepaired = machines.filter(machine => machine.status === 'repaired');
    const totalErrored = machines.filter(machine => machine.status === 'errored');
    const totalFinished = machines.filter(machine => machine.status === 'finished');

    return (
      <Box
        responsive={false}
        align='center'
        pad={{ between: 'small', horizontal: 'medium', vertical: 'medium' }}
      >
        <Title>
          Usage Status
        </Title>
        <Paragraph>
          Status of each machine at this moment.
        </Paragraph>
        <AnnotatedMeter
          legend={true}
          size='small'
          type='circle'
          max={machines.length}
          series={[
            { label: 'Running', value: totalRunning.length, colorIndex: 'warning' },
            { label: 'Finished', value: totalFinished.length, colorIndex: 'ok' },
            { label: 'Errored', value: totalErrored.length, colorIndex: 'critical' },
            { label: 'Repaired', value: totalRepaired.length, colorIndex: 'graph-2' }
          ]}
        />
      </Box>
    );
  }

  renderTotalMaintenanceLastHundredDaysChart() {
    const { machines, totalMaintenanceLastHundredDays } = this.props;

    return (
      <Box
        responsive={false}
        align='center'
        pad={{ between: 'small', horizontal: 'medium', vertical: 'medium' }}
      >
        <Title>
          Maintenance
        </Title>
        <Paragraph>
          Total Machines checked in the last year.
        </Paragraph>
        <AnnotatedMeter
          legend={true}
          size='small'
          type='circle'
          max={machines.length}
          series={[
            { label: 'Done', value: totalMaintenanceLastHundredDays, colorIndex: 'ok' },
            { label: 'Waiting', value: machines.length - totalMaintenanceLastHundredDays, colorIndex: 'unknown' },
          ]}
        />
      </Box>
    );
  }

  // Render a graphic showing how many are microscopes and how many are measurement machines
  renderMachineDistribution() {
    const { machines } = this.props;

    const totalMicroscopes = machines.filter(machine => machine.machine_type === 'microscope');
    const totalMeasurement = machines.filter(machine => machine.machine_type === 'measurement');

    return (
      <Distribution
        size='small'
        series={[{
          label: 'Total Microscopes',
          value: totalMicroscopes.length,
          colorIndex: 'brand',
        }, {
          label: 'Total Measurement Machines',
          value: totalMeasurement.length,
          colorIndex: 'accent-2',
        }]}
      />);
  }

  render() {
    const { error } = this.props;
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
        <Tiles fill={true}>
          {this.renderMachineStatusChart()}
          {this.renderTotalMaintenanceLastHundredDaysChart()}
        </Tiles>
        <Section>
          {this.renderMachineDistribution()}
        </Section>
      </Article>
    );
  }
}

Dashboard.defaultProps = {
  error: undefined,
  machines: [],
  totalMaintenanceLastHundredDays: 0,
};

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object,
  machines: PropTypes.arrayOf(PropTypes.object),
  totalMaintenanceLastHundredDays: PropTypes.number,
};

const select = state => ({ ...state.dashboard });

export default connect(select)(Dashboard);
