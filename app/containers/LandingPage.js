import React, { Component } from 'react';
import Landing from '../components/Landing';

export default class LandingPage extends Component {
  render() {
    if(window.localStorage.getItem('tutorial') === null || process.env.NODE_ENV === 'development') {
      window.localStorage.setItem('tutorial', false);
    }
    return (
      <Landing />
    );   
  }
}
