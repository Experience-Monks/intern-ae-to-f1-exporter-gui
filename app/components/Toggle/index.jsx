import React from 'react';
import {render} from 'react-dom';
import Switch from 'react-toggle-switch'
import style from './style.css';
 
class Toggle extends React.Component {
  state = {
    toggled: false,
    on: false,
    enabled: false
  };

  constructor(props) {
    super(props);
  }

  handleClick = () => {
    
  }

  render() {
    return (

        <div >
            <Switch  
              onClick={this.handleClick.bind(this) }
              enabled={true}
              on={true}
        />
        </div>
    );
  }
}

Toggle.defaultProps = {}

module.exports = Toggle;