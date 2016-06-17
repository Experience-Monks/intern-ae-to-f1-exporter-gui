import React, { Component } from 'react';

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
    status: React.PropTypes.string,
    filter: React.PropTypes.array
  };

  static defaultProps = {
    previewState: 'idle state',
    type: 'f1Dom',
    download: false,
    status: 'Unsync',
    filter: []
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
                filters={this.props.filter}
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

export default Landing;
