import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './style.css';

import ExportButton from '../ExportButton';
import StateSelector from '../StateSelector';
import Preview from '../Preview'

export default class Landing extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <Preview />
          <StateSelector />
        </div>
        <div className={styles.right}>
          <ExportButton />
          </div>
        </div>
    );
  }
}
