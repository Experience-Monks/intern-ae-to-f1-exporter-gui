import React, { Component } from 'react';
import { connect } from 'react-redux';
import mkdirp from 'mkdirp';
import ncp from 'ncp';

import styles from './style.css';
import electron from 'electron';

class DownloadButton extends Component {

   // handleClick = () => {
   //     if(this.props.download) {
   //         let path = electron.remote.dialog.showSaveDialog();
   //         mkdirp(path);
   //         ncp('./output-react', path, (err) => {
   //             if(err) console.error(err);
   //         });
   //     }
   // }

    render() {
        return (
            <div className={styles.container}>
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
        status: state.status
    };
}

const DownloadContainer = connect(mapStateToProps)(DownloadButton);


export default DownloadContainer;
