import React from 'react';
import style from './style.css';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ToggleActions from '../../actions/toggle';

class Toggle extends React.Component {
  static propTypes = {
    previewType: React.PropTypes.string,
    status: React.PropTypes.string,
    setType: React.PropTypes.func
  }

  handleClick = (previewType) => {
    if(this.props.status === 'Synchronizing') return;
    this.props.setType(previewType === 'f1Dom' ? 'react' : 'f1Dom');
  }

  render() {
    const { previewType } = this.props;
    const toggleClass = previewType === 'react' ?
      classNames(style.switchToggle) : classNames(style.switchToggle, style.switchOn);

    return (
        <div className={this.props.className}>
          <span style={{ color: previewType === 'react' ? '#2B2727' : '#959393' }}>f1 React</span>
          <div className={style.switch} onClick={() => this.handleClick(previewType)} >
            <div className={toggleClass} />
          </div>
          <span style={{ color: previewType !== 'react' ? '#2B2727' : '#959393' }}>f1 Dom</span>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.status,
    previewType: state.previewType
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ToggleActions, dispatch);
}

const ToggleContainer = connect(mapStateToProps, mapDispatchToProps)(Toggle);

export default ToggleContainer;

