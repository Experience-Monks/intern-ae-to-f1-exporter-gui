import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactF1Preview from '../ReactF1Preview/index.jsx';

import * as SelectStateActions from '../../actions/selectState';
import styles from './style.css';

class Preview extends Component {
    static propType = {
        previewState: React.PropTypes.string,
        download: React.PropTypes.bool
    }

    state = {
        backgroundPlaceHolder: {
            backgroundColor: 'rgba(0,0,0,0.5)'
        }
    }

    render() {
        const { previewState, download } = this.props;
        if(!download) {
            return (
                <div className={styles.container}>
                    <div className={styles.previewContainer} style={this.state.backgroundPlaceHolder}>
                    </div>
                </div>
            );    
        }
        else {
            return (
                <div className={styles.container}>
                    <div className={styles.previewContainer} >
                        <ReactF1Preview previewState={previewState} />
                    </div>
                </div>
            );
        }
        
    }
}

function mapStateToProps(state) {
    return {
        setAnimationState: state.previewState,
        previewState: state.previewState,
        download: state.download
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SelectStateActions, dispatch);
}

const PreviewContainer = connect(mapStateToProps, mapDispatchToProps)(Preview);

export default PreviewContainer;
