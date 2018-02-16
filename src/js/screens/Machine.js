import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Timestamp from 'grommet/components/Timestamp';
import Notification from 'grommet/components/Notification';
import Spinning from 'grommet/components/icons/Spinning';
import LinkPrevious from 'grommet/components/icons/base/LinkPrevious';
import Title from 'grommet/components/Title';
import Section from 'grommet/components/Section';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

import { loadMachine } from '../actions/machines';
import { pageLoaded } from './utils';

function getColorIndex(status) {
  switch (status) {
    case 'finished':
      return 'ok';
    case 'running':
      return 'warning';
    case 'errored':
      return 'critical';
    case 'repaired':
      return 'accent-1';
    default:
      return 'unknown';
  }
}

class Machine extends Component {
  componentDidMount() {
    const { match: { params }, dispatch } = this.props;
    pageLoaded('Machine');
    dispatch(loadMachine(params.id));
  }

  renderNotificationStatus() {
    const { machine } = this.props;
    if (!machine) {
      return null;
    }
    switch (machine.status) {
      case 'errored':
        return (
          <Notification
            status='critical'
            message='This machine has errors and needs to be repaired.'
          />);
      case 'finished':
        return (<Notification status='ok' message='This machine has finished a job recently.' />);
      case 'running':
        return (<Notification status='warning' message='This machine is running at the moment.' />);
      default:
        return (
          <Notification
            status='unknown'
            message='The status of this machine is unknown.'
          />);
    }
  }

  renderMachineLog() {
    const { machine } = this.props;
    if (!machine) {
      return null;
    }

    const eventsList = (machine.events || []).map(event => (
      <ListItem
        key={`event_${event.timestamp}`}
        colorIndex={getColorIndex(event.status)}
        justify='between'
      >
        <span>Status: {event.status}</span>
        <span><Timestamp value={event.timestamp} /></span>
      </ListItem>)
    );

    return (
      <List>
        <ListItem
          justify='between'
        >
          <Title margin='none'>Events Log</Title>
        </ListItem>
        {eventsList}
      </List>
    );
  }

  render() {
    const { error, machine } = this.props;
    console.log(machine);
    let errorNode;
    let machineNode;
    if (error) {
      errorNode = (
        <Notification
          status='critical'
          size='large'
          state={error.message}
          message='An unexpected error happened, please try again later'
        />
      );
    } else if (!machine) {
      machineNode = (
        <Box
          direction='row'
          responsive={false}
          pad={{ between: 'small', horizontal: 'medium', vertical: 'medium' }}
        >
          <Spinning /><span>Loading...</span>
        </Box>
      );
    } else {
      machineNode = (
        <List>
          <ListItem
            justify='between'
          >
            <Title margin='none'>Machine Details</Title>
          </ListItem>
          <ListItem
            justify='between'
          >
            <span>Machine Type: {machine.machine_type}</span>
          </ListItem>
          <ListItem
            justify='between'
          >
            <span>Installation Date: <Timestamp fields='date' value={machine.install_date} /></span>
          </ListItem>
          <ListItem
            justify='between'
          >
            <span>Floor Location: {machine.floor}</span>
          </ListItem>
          <ListItem
            justify='between'
          >
            <span>Last Maintenance: <Timestamp value={machine.last_maintenance} /> </span>
          </ListItem>
        </List>
      );
    }

    return (
      <Article primary={true} full={true}>
        <Header
          direction='row'
          size='large'
          colorIndex='light-2'
          align='center'
          responsive={false}
          pad={{ horizontal: 'small' }}
        >
          <Anchor path='/machines'>
            <LinkPrevious a11yTitle='Back to Machines' />
          </Anchor>
          <Heading truncate margin='none' strong={true}>
            {machine ? `Machine #${machine.id.substr(-4)}` : 'Machine'}
          </Heading>
        </Header>
        <Section pad='medium'>
          {this.renderNotificationStatus()}
          {errorNode}
        </Section>
        <Section>
          {machineNode}
        </Section>
        <Section>
          {this.renderMachineLog()}
        </Section>
      </Article>
    );
  }
}

Machine.defaultProps = {
  error: undefined,
  machine: undefined,
};

Machine.propTypes = {
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object,
  machine: PropTypes.object,
};

const select = state => ({ ...state.machines });

export default connect(select)(Machine);
