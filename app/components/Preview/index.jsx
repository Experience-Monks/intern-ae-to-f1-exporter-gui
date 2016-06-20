import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactF1Preview from '../ReactF1Preview/index.jsx';

import * as SelectStateActions from '../../actions/selectState';
import * as ErrorsAction from '../../actions/errors';
import styles from './style.css';
import noPreviewSvg from './no-preview.svg';
import classnames from 'classnames';

class Preview extends Component {
  static propType = {
    previewType: React.PropTypes.string,
    previewState: React.PropTypes.string,
    download: React.PropTypes.bool,
    displayError: React.PropTypes.func
  };

  render() {
    const { previewState, download, displayError } = this.props;
    const className = classnames(styles.container, this.props.className);
    try {
      return (
        <div className={className}>
          {
            !download
            ? <NoPreview />
            : <div className={styles.previewContainer} >
                <ReactF1Preview previewState={previewState} />
              </div>
          }
        </div>
      );  
    }
    catch (e) {
      displayError({
        description: 'An error occurred rendering the preview.',
        suggestion: 'Make sure your project\'s composition is compatible with F1.',
        error: e.message
      });
    }
    
  }
}

function NoPreview() {
  return (
    <div className={styles.noPreview}>
      <div dangerouslySetInnerHTML={{ __html: noPreviewSvg }}></div>
      <label>No<br />Preview</label>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    setAnimationState: state.previewState,
    previewState: state.previewState,
    download: state.download,
    previewType: state.previewType
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, SelectStateActions, ErrorsAction), dispatch);
}

const PreviewContainer = connect(mapStateToProps, mapDispatchToProps)(Preview);

export default PreviewContainer;
