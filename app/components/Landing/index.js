import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as LandingActions from '../../actions/landing';

import styles from './style.css';

import ExportButton from '../ExportButton/index.jsx';
import StateSelector from '../StateSelector/index.jsx';
import Preview from '../Preview/index.jsx';
import DownloadButton from '../DownloadButton/index.jsx';

class Landing extends Component {

  static propTypes = {
    previewState: React.PropTypes.string,
    setDownloadState: React.PropTypes.func,
    type: React.PropTypes.string,
    download: React.PropTypes.bool,
    status: React.PropTypes.string
  };

  static defaultProps = {
    previewState: 'idle state',
    type: 'f1Dom',
    download: false,
    status: 'Unsync'
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
              <ExportButton
                type={this.props.type}
                download={this.props.download}
                status={this.props.status}
              />
              <DownloadButton
                download={this.props.download}
                status={this.props.status}
              />
            </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        previewState: state.previewState,
        setDownloadState: state.download
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(LandingActions, dispatch);
}

const LandingContainer = connect(mapStateToProps, mapDispatchToProps)(Landing);

export default LandingContainer;
