import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import style from './style.css';

import * as SelectStateActions from '../../actions/selectState';

class StateSelector extends Component {
  static propTypes = {
    setAnimationState: React.PropTypes.func,
    selectPreviewState: React.PropTypes.func,
    animationState: React.PropTypes.string.isRequired
  };

  static defaultProps = {
    animationState: 'idle state'
  }

  state = {
    filter: 'idle state'
  }

  filterTypes = [ 'idle state', 'hover state', 'over state'];

  componentWillReceiveProps( receivedProps) {
    if(receivedProps.animationState === 'over state') {
      this.transformPreview('over');
    }
    else if(receivedProps.animationState === 'hover state') {
      this.transformPreview('hover'); 
    }
    else {
      this.transformPreview('idle');
    }
  }

  render() {
    const { setAnimationState, animationState } = this.props;
    return (
      <div className={style.inputWrapper}>
        {
          this.filterTypes.map(type => {
            return (
              <div key={type} className={style.checkContainer} >
                <input
                  id={type}
                  className={style.checkbox}
                  type="checkbox" value={type}
                  checked={animationState === type}
                  onChange={() => setAnimationState(type) }
                /> 
                <label className={style.checkboxLabel} htmlFor={type}>{type}</label>
              </div>
            )
          })
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    animationState: state.animationState
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SelectStateActions, dispatch);
}

const StateSelectorContainer = connect(mapStateToProps, mapDispatchToProps)(StateSelector);

export default StateSelectorContainer;
