import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as SelectStateActions from '../../actions/selectState';

import styles from './style.css';

class Preview extends Component {
    state = {
        synced: false,
        backgroundPlaceHolder: {
            backgroundColor: 'rgba(0,0,0,0.5)'
        }
    }

  componentWillReceiveProps(receivedProps) {
    // Actions to create preview here
    if (receivedProps.currentAnimation !== undefined) {
        this.setState({ backgroundPlaceHolder: {} });
    }
  }

  render() {
    return (
        <div className={styles.container}>
            <div className={styles.previewContainer} style={this.state.backgroundPlaceHolder}>
            </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    setAnimationState: state.previewState,
    previewState: state.previewState
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SelectStateActions, dispatch);
}

const PreviewContainer = connect(mapStateToProps, mapDispatchToProps)(Preview);

export default PreviewContainer;
