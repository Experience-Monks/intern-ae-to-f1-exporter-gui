import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import style from './style.css';
import classnames from 'classnames';

class PositionTracker extends Component {
  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps.scale);
    console.log(nextProps.offset);
  }
  render() {
    return (
      <div className={style['position-tracker']}>
        <p className={style.tracker}>{this.props.scale}</p>
        <p className={style.tracker}>{'X: ' + this.props.offset.x}</p>
        <p className={style.tracker}>{'Y: ' + this.props.offset.y}</p>
      </div>
    );
  }
}

export default PositionTracker;
