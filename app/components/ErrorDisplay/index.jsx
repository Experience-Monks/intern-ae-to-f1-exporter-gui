import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { displayError, clearError } from '../../actions/errors';
import styles from './style.css';
import classnames from 'classnames';
import animate from 'gsap-promise';
import diff from 'deep-diff';

class ErrorDisplay extends Component {
  static propTypes = {
    message: React.PropTypes.object
  };

  componentDidMount() {
    animate.set(this.refs.container, { y: this.props.message ? '0%' : '-100%' });
  }

  componentWillReceiveProps(nextProps) {
    if(diff(this.props.message, nextProps.message).length) {
      if(!this.props.message) {
        this.animateIn();
      } else if(nextProps.message) {
        this.animateMessageChange();
      } else {
        this.animateOut();
      }
    }
  }

  animateIn = () => {
    TweenMax.killTweensOf(this.refs.container);
    return animate.to(this.refs.container, 0.3, { y: '0%', ease: Quad.easeOut });
  };

  animateOut = () => {
    TweenMax.killTweensOf(this.refs.container);
    return animate.to(this.refs.container, 0.3, { y: '-100%', ease: Quad.easeOut });
  };

  animateMessageChange = () => {
    TweenMax.killTweensOf(this.refs.container);
    return animate.to(this.refs.container, 0.3, { opacity: 0.6, ease: Quad.easeIn })
      .then(() => animate.to(this.refs.container, 0.3, { opacity: 1, ease: Quad.easeOut }))
  };

  handleClick = () => {
    this.animateOut().then(this.props.close);
  };

  render() {
    const { time, description, suggestion } = this.props.message || {};

    return (
      <div ref="container" className={styles.errorDisplay}>
        <div className={styles.errorTime}>{`[ ${time} ]`}</div>
        <div className={styles.errorTitle}>{description}</div>
        <div className={styles.errorSuggestion}>{suggestion}</div>
        <div className={styles.closeButton} onClick={this.handleClick}>Close</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.errors.message,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    display: (msg) => dispatch(displayError(msg)),
    close: () => dispatch(clearError())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorDisplay);
