import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as DownloadActions from '../../actions/landing';

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

function mapStateToProps(state) {
    return {
        download: state.download,
        status: state.status
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(DownloadActions, dispatch);
}

const DownloadContainer = connect(mapStateToProps, mapDispatchToProps)(DownloadButton);


export default DownloadContainer;
