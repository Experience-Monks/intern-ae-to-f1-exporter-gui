import React, { Component } from 'react';

import styles from './style.css';

class DownloadButton extends Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextprops');
        console.log(nextProps);
    }

    handleClick = () => {
        if(this.props.downloadEnabled && this.props.downloadEnabled === true) {
            console.log('download');
        }
    }

    render() {
        return (
            <div className={styles.container}>
                <div onClick={this.handleClick.bind(this)}>
                    {'download'}
                </div>
            </div>
        );
    }
}

export default DownloadButton;
