import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './style.css';

const fs = require('fs');

class DownloadButton extends Component {

    componentWillReceiveProps(nextProps) {
        
    }

    handleClick = () => {
        if(this.props.download) {
            console.log('download');
        }
    }

    render() {
        console.log(this.props);
        return (
            <div className={styles.container}>
                <div onClick={this.handleClick.bind(this)}>
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
