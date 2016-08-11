import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import style from './style.css';
import classnames from 'classnames';
import Checkbox from '../Checkbox';
import PositionTracker from '../PositionTracker';

import * as SelectStateActions from '../../actions/selectState';

class StateSelector extends Component {
  static propTypes = {
    setAnimationState: React.PropTypes.func,
    filter: React.PropTypes.array,
    previewState: React.PropTypes.string,
    emailFocus: React.PropTypes.bool,
    scale: React.PropTypes.string,
    offset: React.PropTypes.object
  };

  static defaultProps = {
    filter: []
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    const { filter, emailFocus } = this.props;
    if(emailFocus) return;
    const stateIndex = e.keyCode - 49;

    if(filter[stateIndex] && e.keyCode >= 49 && e.keyCode <= 57) {
      this.props.setAnimationState(filter[stateIndex]);
    }
  }

  render() {
    const { setAnimationState, filter } = this.props;
    const className = classnames(style.stateSelector, this.props.className);
    return (
      <div className={this.props.className}>
        {
          filter.length > 0 ? 
          <PositionTracker 
            scale={this.props.scale}
            offset={this.props.offset}
          />  
          : <div></div>
        } 
        <div className={style.stateSelector}>
          {
            filter.map((type, index) => {
              return (
                <div key={type} className={style.checkContainer} >
                  <Checkbox
                    id={type}
                    key={index}
                    className={style.checkbox}
                    checked={this.props.previewState === type}
                    onChange={() => setAnimationState(type)}
                  />
                  <label className={style.checkboxLabel} htmlFor={type}>{type}</label>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    filter: state.filter,
    previewState: state.previewState,
    emailFocus: state.emailFocus,
    scale: state.scale,
    offset: state.offset
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SelectStateActions, dispatch);
}

const StateSelectorContainer = connect(mapStateToProps, mapDispatchToProps)(StateSelector);

export default StateSelectorContainer;
