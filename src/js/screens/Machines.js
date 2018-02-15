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
import Card from 'grommet/components/Card';
import Paragraph from 'grommet/components/Paragraph';
import Spinning from 'grommet/components/icons/Spinning';
import Status from 'grommet/components/icons/Status';
import { getMessage } from 'grommet/utils/Intl';

import NavControl from '../components/NavControl';

import { loadMachines } from '../actions/machines';

import { pageLoaded } from './utils';

class Machines extends Component {
  componentDidMount() {
    pageLoaded('Machines');
    this.props.dispatch(loadMachines());
  }

  componentWillUnMount() {
    this.props.dispatch(unloadMachines());
  }

  getStatusComponent(status){
    switch (status){
      case 'running':
        return <Spinning />
      case 'finished':
        return <Status value='ok' />
      default:
        return <Status value='unknown' />
    }
  }

  render() {
    const { error, data } = this.props;
    const { intl } = this.context;
    let errorNode;
    let listMachines;
    if (error) {
      errorNode = (
        <Notification
          status='critical'
          size='large'
          state={error.message}
          message='An unexpected error happened, please try again later'
        />
      );
    } else if (data.length === 0) {
      listMachines = (
        <Box
          direction='row'
          responsive={false}
          pad={{ between: 'small', horizontal: 'medium', vertical: 'medium' }}
        >
          <Spinning /><span>Loading Machines...</span>
        </Box>
      );
    } else {
      const tasksNode = (data || []).map(machine => (
        <Card
          key={`machine_${machine.id}`}
          justify='between'
          label={machine.status}
        >
          <Label><Anchor path={`/machines/${machine.id}`} label={machine.id} /></Label>
          <Box
            direction='row'
            responsive={true}
            pad={{ between: 'small' }}
          >
            {this.getStatusComponent(machine.status)}
          </Box>
        </Card>
      ));

      listMachines = (
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
          <NavControl name={getMessage(intl, 'Machines Deployed')} />
        </Header>
        {errorNode}
        <Box pad={{ horizontal: 'medium' }}>
          <Paragraph size='large'>
            This is the list of Machines deployed.
          </Paragraph>
        </Box>
        {listMachines}
      </Article>
    );
  }
}

Machines.defaultProps = {
  error: undefined,
  data: [],
};

const select = state => ({ ...state.tasks });

export default connect(select)(Machines);