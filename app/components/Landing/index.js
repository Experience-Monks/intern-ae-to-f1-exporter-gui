import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as LandingActions from '../../actions/landing';

import styles from './style.css';

import ExportButton from '../ExportButton';
import StateSelector from '../StateSelector';
import Preview from '../Preview'

class Landing extends Component {

  static propTypes = {
    previewState: React.PropTypes.string
  };

  static defaultProps = {
    previewState: 'idle state'
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <Preview  
            previewState={this.props.previewState} 
          />
          <StateSelector 
            previewState={this.props.previewState} 
          />
        </div>
        <div className={styles.right}>
          <ExportButton />
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    previewState: state.previewState,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(LandingActions, dispatch);
}

const LandingContainer = connect(mapStateToProps, mapDispatchToProps)(Landing);

export default LandingContainer;
