import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import style from './style.css';

import * as SelectStateActions from '../../actions/selectState';

class StateSelector extends Component {
  static propTypes = {
    setAnimationState: React.PropTypes.func
  };

  filterTypes = [ 'idle state', 'hover state', 'over state'];

  componentWillReceiveProps( receivedProps) {

  }

  render() {
    const { setAnimationState, selectPreviewState } = this.props;
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
                  checked={this.props.previewState === type}
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
    setAnimationState: state.previewState
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SelectStateActions, dispatch);
}

const StateSelectorContainer = connect(mapStateToProps, mapDispatchToProps)(StateSelector);

export default StateSelectorContainer;
