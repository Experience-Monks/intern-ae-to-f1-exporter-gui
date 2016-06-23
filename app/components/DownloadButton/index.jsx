
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mkdirp from 'mkdirp';

import styles from './style.css';
import electron from 'electron';
import shelljs from 'shelljs';
shelljs.config.fatal = false;

class DownloadButton extends Component {
  static propTypes = {
    download: React.PropTypes.bool,
    previewType: React.PropTypes.string,
    compExports: React.PropTypes.array,
    compDownload: React.PropTypes.array,
    compState: React.PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (download) => {
    if(download) {
      let path = electron.remote.dialog.showSaveDialog();

      if(!path) return;
      mkdirp(path);
      if(this.props.compState) {
        if(this.props.previewType === 'react') {
          this.props.compDownload.forEach((comp) => {
            shelljs.cp('-R', __dirname + '/output-react/' + comp, path);  
          });
          
        }
        else {
          this.props.compDownload.forEach((comp) => {
            shelljs.cp('-R', __dirname + '/output-f1/' + comp, path);
          });
        }
      }
      else if(this.props.compDownload.length === 0) {
        return;
      }
      else {
        if(this.props.previewType === 'react') {
          shelljs.cp('-R', __dirname + '/output-react/*', path);  
        }
        else {
          shelljs.cp('-R', __dirname + '/output-react/*', path);  
        }
      }
      
    }
  }

  render() {
    const { download } = this.props;
    return (
      <div className={styles.container} onClick={() => this.handleClick(download)}>
        <div>
          {'download'}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        download: state.download,
        status: state.status,
        previewType: state.previewType,
        compDownload: state.compDownload,
        compState: state.compState
    };
}

const DownloadContainer = connect(mapStateToProps)(DownloadButton);

export default DownloadContainer;
