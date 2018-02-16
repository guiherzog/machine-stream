import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Label from 'grommet/components/Label';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Notification from 'grommet/components/Notification';
import Paragraph from 'grommet/components/Paragraph';
import Spinning from 'grommet/components/icons/Spinning';
import Title from 'grommet/components/Title';
import NavControl from '../components/NavControl';
import Timestamp from 'grommet/components/Timestamp';

import {
  loadEvents
} from '../actions/events';

import { pageLoaded, getColorIndex, getStatusComponent } from './utils';

function getMessage(status) {
  switch (status) {
    case 'repaired':
      return ' has just been repaired.';
    case 'finished':
      return ' finished a task.';
    case 'running':
      return ' started a task.';
    case 'errored':
      return ' had an error and needs attention.';
    default:
      return ' had an unknown activity.';
  }
}

class Events extends Component {
  componentDidMount() {
    pageLoaded('Events');
    this.props.dispatch(loadEvents());
  }

  render() {
    const { error, events } = this.props;
    console.log(events);
    let errorNode;
    let listNode;
    if (error) {
      errorNode = (
        <Notification
          status='critical'
          size='large'
          state={error.message}
          message='An unexpected error happened, please try again later'
        />
      );
    } else if (events.length === 0) {
      listNode = (
        <Box
          direction='row'
          responsive={false}
          alignSelf='center'
          align='center'
          pad={{ between: 'small', horizontal: 'medium', vertical: 'medium' }}
        >
          <Spinning /><Label>Waiting for new events...</Label>
        </Box>
      );
    } else {
      const tasksNode = (events || []).map(event => (
        <ListItem
          key={`task_${event.id}`}
          justify='between'
          align='center'
          colorIndex={getColorIndex(event.status)}
        >
          <span>
            <Anchor
              icon
              path={`/machines/${event.machine_id}`}
              label={`Machine #${event.machine_id.substr(-4)}`}
            />
            {getMessage(event.status)}
          </span>
          <Box
            direction='row'
            responsive={false}
            pad={{ between: 'small' }}
          >
            <span><Timestamp value={event.timestamp} /></span>
          </Box>
        </ListItem>
      ));

      listNode = (
        <List>
          {tasksNode}
        </List>
      );
    }

    return (
      <Article primary={true}>
        <Header
          direction='row'
          justify='between'
          size='large'
          pad={{ horizontal: 'medium', between: 'small' }}
        >
          <NavControl />
          <Title>
            Real-Time Monitor
          </Title>
        </Header>
        {errorNode}
        <Box pad={{ horizontal: 'medium' }}>
          <Paragraph size='medium'>
            This page provides a near real-time graph to monitor any issues on all machines.
          </Paragraph>
        </Box>
        {listNode}
      </Article>
    );
  }
}

Events.defaultProps = {
  error: undefined,
  events: [],
};

Events.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object,
  events: PropTypes.arrayOf(PropTypes.object)
};

const select = state => ({ ...state.events });

export default connect(select)(Events);
