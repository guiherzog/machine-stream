import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Label from 'grommet/components/Label';
import Tiles from 'grommet/components/Tiles';
import Notification from 'grommet/components/Notification';
import Title from 'grommet/components/Title';
import Card from 'grommet/components/Card';
import Paragraph from 'grommet/components/Paragraph';
import Search from 'grommet/components/Search';

import Spinning from 'grommet/components/icons/Spinning';
import MeasureIcon from 'grommet/components/icons/base/Vulnerability';
import MicroscopeIcon from 'grommet/components/icons/base/SearchAdvanced';

import NavControl from '../components/NavControl';

import { loadMachines, unloadMachines } from '../actions/machines';

import { pageLoaded, getStatusComponent } from './utils';

function getMachineTypeComponent(type) {
  switch (type) {
    case 'measurement':
      return (
        <Box
          direction='row'
          align='center'
          pad={{ between: 'small' }}
        >
          <MeasureIcon />
          <Label>Measurement</Label>
        </Box>);
    case 'microscope':
      return (
        <Box
          direction='row'
          align='center'
          pad={{ between: 'small' }}
        >
          <MicroscopeIcon />
          <Label>Microscope</Label>
        </Box>);
    default:
      return 'Unkown Type';
  }
}

class Machines extends Component {
  componentDidMount() {
    pageLoaded('Machines');
    this.props.dispatch(loadMachines());
  }

  componentWillUnMount() {
    this.props.dispatch(unloadMachines());
  }

  render() {
    const { error, machines } = this.props;

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
    } else if (machines.length === 0) {
      listMachines = (
        <Box
          responsive={false}
          pad={{ between: 'small', horizontal: 'medium', vertical: 'medium' }}
        >
          <Spinning /><span>Loading Machines...</span>
        </Box>
      );
    } else {
      const tasksNode = (machines || []).map(machine => (
        <Card
          colorIndex='light-2'
          margin='small'
          key={`machine_${machine.id}`}
          heading={`Machine #${machine.id.substr(-4)}`}
          textSize='small'
          description={getMachineTypeComponent(machine.machine_type)}
          label={
            <Box
              direction='row'
              align='center'
              margin='small'
              pad={{ between: 'small' }}
            >
              {getStatusComponent(machine.status)}
              <span>{machine.status.toUpperCase()}</span>
            </Box>
          }
        >
          <span><Anchor path={`/machines/${machine.id}`} label={'More Details'} /></span>
        </Card>
      ));

      listMachines = (
        <Tiles
          fill={true}
        >
          {tasksNode}
        </Tiles>
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
            Machines Deployed
          </Title>
          <Search
            inline={true}
            fill={true}
            size='medium'
            placeHolder='Type status here...'
            dropAlign={{ right: 'right' }}
          />
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
  machines: [],
};

Machines.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object,
  machines: PropTypes.arrayOf(PropTypes.object)
};


const select = state => ({ ...state.machines });

export default connect(select)(Machines);
