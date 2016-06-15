import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import styles from './style.css';

class Preview extends Component {
  static propTypes = {

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
    //Actions to create preview here
    if(receivedProps.currentAnimation !== undefined) {
      this.setState({backgroundPlaceHolder: {}}); 
    }
  }

  render() {
    const {  selectPreviewState } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.previewContainer} style={this.state.backgroundPlaceHolder}>
          
        </div>
        
      </div>
    );
  }
}

export default Preview;
