import React, { Component, PropTypes } from 'react';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    const style = {
      width: '100%',
      height: '100%'
    };

    return (
      <div style={style}>
        {
          this.props.children
        }
        {
          (() => {
            if (process.env.NODE_ENV !== 'production') {
              // eslint-disable-line global-require
              const DevTools = require('./DevTools'); 
              return <DevTools />;
            }
          })()
        }
      </div>
    );
  }
}
