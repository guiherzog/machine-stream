import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';
import Notification from 'grommet/components/Notification';
import Spinning from 'grommet/components/icons/Spinning';
import LinkPrevious from 'grommet/components/icons/base/LinkPrevious';

import { loadMachine } from '../actions/machines';
import { pageLoaded } from './utils';

class Machine extends Component {
  componentDidMount() {
    const { match: { params }, dispatch } = this.props;
    pageLoaded('Machine');
    dispatch(loadMachine(params.id));
  }


  render() {
    const { error, machine } = this.props;

    let errorNode;
    let taskNode;
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
      taskNode = (
        <Box
          direction='row'
          responsive={false}
          pad={{ between: 'small', horizontal: 'medium', vertical: 'medium' }}
        >
          <Spinning /><span>Loading...</span>
        </Box>
      );
    } else {
      taskNode = (
        <Box pad='medium'>
          <Label>Status: {machine.status}</Label>
          <Box
            responsive={false}
            pad={{ between: 'small' }}
          >
            <Label>MachineType: {machine.machine_type}</Label>
            <Label>Install Date: {machine.install_date}</Label>
            <Label>Last Maintenance: {machine.last_maintenance}</Label>
          </Box>
        </Box>
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
          <Heading margin='none' strong={true}>
            {machine ? `Machine ${machine.id}` : 'Machine'}
          </Heading>
        </Header>
        {errorNode}

        {taskNode}
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

const select = state => ({ ...state.tasks });

export default connect(select)(Machine);
