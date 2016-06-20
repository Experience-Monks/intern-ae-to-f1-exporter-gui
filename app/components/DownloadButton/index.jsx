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
      previewType: React.PropTypes.string
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
            if(this.props.previewType === 'react') {
                shelljs.cp('-R', __dirname + '/', path);
            }
            else {
                shelljs.cp('-R', __dirname + '/', path);
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
        previewType: state.previewType
    };
}

const DownloadContainer = connect(mapStateToProps)(DownloadButton);

export default DownloadContainer;
