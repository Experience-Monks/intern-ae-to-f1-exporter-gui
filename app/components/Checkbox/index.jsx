import React, { Component } from 'react';
import styles from './style.css';
import classnames from 'classnames';

class Checkbox extends Component {
  static propTypes = {
    className: React.PropTypes.string,
    checked: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    onChange: React.PropTypes.func,
    invertedColors: React.PropTypes.bool
  };

  static defaultProps = {
    onChange: () => {}
  };

  handleClick = (e) => {
    e.stopPropagation();
    this.refs.checkbox.click();
  };

  render() {
    const className = classnames(styles.checkbox, this.props.className, {
      [styles.checked]: this.props.checked,
      [styles.invertedColors]: this.props.invertedColors
    });

    return (
      <div
        className={className}
        onClick={this.handleClick}
      >
        <input
          id={this.props.id}
          ref="checkbox"
          type="checkbox"
          checked={this.props.checked}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default Checkbox;
