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

  state = {
    backgroundPlaceHolder: {
      backgroundColor: 'rgba(0,0,0,0.5)'
    }
  };

  getContent = () => {
    const { previewType, previewState, download } = this.props;

    if(!download) {
      // return (
      //   <div className={styles.previewContainer} style={this.state.backgroundPlaceHolder}></div>
      // );

      return <NoPreview />   
    }

    if(previewType === 'react') {
      return (
        <div className={styles.previewContainer} >
          <ReactF1Preview previewState={previewState} />
        </div>
      );
    }

    return (
      <div className={styles.previewContainer} ></div>
    );
  };

  render() {
    const className = classnames(styles.container, this.props.className);

    return (
      <div className={className}>
        {
          this.getContent()
        }
      </div>
    )
  }
}

function NoPreview() {
  return (
    <div className={styles.noPreview}>
      <div dangerouslySetInnerHTML={{ __html: noPreviewSvg }}></div>
      <label>No<br/>Preview</label>
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
