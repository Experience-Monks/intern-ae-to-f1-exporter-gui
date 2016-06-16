import React, { Component } from 'react';

import styles from './style.css';

class DownloadButton extends Component {


    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    handleClick = () => {
        if(this.props.status && this.props.status === 'Synchronized') {
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

export default DownloadButton;
