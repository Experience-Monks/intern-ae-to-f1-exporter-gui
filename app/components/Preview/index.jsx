import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactF1Preview from '../ReactF1Preview/index.jsx';

import * as SelectStateActions from '../../actions/selectState';
import styles from './style.css';
import noPreviewSvg from './no-preview.svg';
import classnames from 'classnames';

class Preview extends Component {
  static propType = {
    previewType: React.PropTypes.string,
    previewState: React.PropTypes.string,
    download: React.PropTypes.bool
  };

  render() {
    const { previewState, download } = this.props;
    const className = classnames(styles.container, this.props.className);

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
  return bindActionCreators(SelectStateActions, dispatch);
}

const PreviewContainer = connect(mapStateToProps, mapDispatchToProps)(Preview);

export default PreviewContainer;
