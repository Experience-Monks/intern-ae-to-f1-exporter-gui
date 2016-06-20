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
    if(this.props.status === 'Synching') return;
    this.props.setType(previewType === 'f1Dom' ? 'react' : 'f1Dom');
  }

  render() {
    const { previewType } = this.props;
    const toggleClass = previewType === 'react' ? 
      classNames(style.switchToggle) : classNames(style.switchToggle, style.switchOn);

    const toggleTextClass = previewType === 'react' ?
      classNames(style.toggleText, style.toggleTextRight) : classNames(style.toggleText, style.toggleTextLeft);

    return (
        <div className={this.props.className}>
          F1 REACT
          <div className={style.switch} onClick={() => this.handleClick(previewType)} >
            <div className={toggleClass} />
          </div>
          F1 DOM
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.status,
    setType: state.previewType,
    previewType: state.previewType
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ToggleActions, dispatch);
}

const ToggleContainer = connect(mapStateToProps, mapDispatchToProps)(Toggle);

export default ToggleContainer;

