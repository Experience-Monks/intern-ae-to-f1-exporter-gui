import React from 'react';
import Switch from 'react-toggle-switch';
import style from './style.css';
 
export default class Toggle extends React.Component {
    state = {
      toggled: false,
      on: false,
      enabled: false
    };

    handleClick = () => {
      
    }

    render() {
        return (
            <div >
                <Switch  
                    onClick={this.handleClick.bind(this)}
                    enabled
                    on
                />
            </div>
        );
    }
}

Toggle.defaultProps = {};
