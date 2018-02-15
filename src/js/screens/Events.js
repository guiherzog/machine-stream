import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Label from 'grommet/components/Label';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Notification from 'grommet/components/Notification';
import Meter from 'grommet/components/Meter';
import Paragraph from 'grommet/components/Paragraph';
import Value from 'grommet/components/Value';
import Spinning from 'grommet/components/icons/Spinning';
import { getMessage } from 'grommet/utils/Intl';

import NavControl from '../components/NavControl';

import {
  loadEvents, unloadEvents
} from '../actions/events';

import { pageLoaded } from './utils';

class Events extends Component {
  componentDidMount() {
    pageLoaded('Events');
    this.props.dispatch(loadEvents());
  }

  componentWillUnmount() {
    this.props.dispatch(unloadEvents());
  }

  render() {
    const { error, events } = this.props;
    const { intl } = this.context;

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
          pad={{ between: 'small', horizontal: 'medium', vertical: 'medium' }}
        >
          <Spinning /><span>Loading Monitor...</span>
        </Box>
      );
    } else {
      const tasksNode = (events || []).map(task => (
        <ListItem
          key={`task_${task.id}`}
          justify='between'
        >
          <Label><Anchor path={`/tasks/${task.id}`} label={task.name} /></Label>
          <Box
            direction='row'
            responsive={false}
            pad={{ between: 'small' }}
          >
            <Value
              value={task.percentComplete}
              units='%'
              align='start'
              size='small'
            />
            <Meter value={task.percentComplete} />
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
          <NavControl name={getMessage(intl, 'Monitoring')} />
        </Header>
        {errorNode}
        <Box pad={{ horizontal: 'medium' }}>
          <Paragraph size='large'>
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

const select = state => ({ ...state.tasks });

export default connect(select)(Events);
