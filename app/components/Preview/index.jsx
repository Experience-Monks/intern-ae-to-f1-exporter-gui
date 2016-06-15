import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PreviewActions from '../../actions/preview';
import styles from './style.css';

class Preview extends Component {
  static propTypes = {
    currentAnimationState: React.PropTypes.string,
    selectPreviewState: React.PropTypes.func
  };

  static defaultProps  = {

  }

  state = {
    synced: false,
    backgroundPlaceHolder: {
      backgroundColor: 'rgba(0,0,0,0.5)'
    }
  }

  componentWillReceiveProps( receivedProps) {
    if(receivedProps.currentAnimation !== undefined) {
      this.setState({backgroundPlaceHolder: {}}); 
    }
  }

  render() {
    const {  } = this.props;
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
    currentAnimation: state.currentAnimationState
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PreviewActions, dispatch);
}

const PreviewContainer = connect(mapStateToProps, mapDispatchToProps)(Preview);

export default PreviewContainer;
