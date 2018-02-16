import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Pulse from 'grommet/components/icons/Pulse';
import MenuIcon from 'grommet/components/icons/base/Menu';
import { navActivate } from '../actions/nav';

class NavControl extends Component {
  render() {
    const { nav: { active } } = this.props;

    let result = null;
    if (!active) {
      result = (
        <Button onClick={() => this.props.dispatch(navActivate(true))}>
          <Box
            direction='row'
            responsive={false}
            pad={{ between: 'small' }}
          >
            <Pulse icon={<MenuIcon />} />
          </Box>
        </Button>
      );
    }
    return result;
  }
}

NavControl.defaultProps = {
  name: undefined,
  nav: {
    active: true, // start with nav active
    enabled: true, // start with nav disabled
    responsive: 'multiple'
  }
};

NavControl.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object
};

const select = state => ({
  nav: state.nav
});

export default connect(select)(NavControl);
