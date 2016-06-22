import React, { Component } from 'react';

import styles from './style.css';

import ExportButton from '../ExportButton/index.jsx';
import StateSelector from '../StateSelector/index.jsx';
import Preview from '../Preview/index.jsx';
import ErrorDisplay from '../ErrorDisplay/index.jsx';
import DownloadButton from '../DownloadButton/index.jsx';
import Toggle from '../Toggle/index.jsx';
//import EmailForm from '../EmailForm/index.jsx';

//import nodeMailer from 'node-mailer';
//import emailSettings from '../../utils/clinet_id.json';
//const emailSettings = require('../../utils/clinet_id.json');

class Landing extends Component {

  static propTypes = {
    previewState: React.PropTypes.string,
    setDownloadState: React.PropTypes.func,
    previewType: React.PropTypes.string,
    download: React.PropTypes.bool,
    status: React.PropTypes.string,
    filter: React.PropTypes.array,
    emailTo: React.PropTypes.string,
    compState: React.PropTypes.bool
  };

  static defaultProps = {
    previewState: 'idle',
    previewType: 'f1Dom',
    download: false,
    status: 'Unsync',
    filter: [],
    compState: false
  };

  handleSubmit = () => {
    console.log('todo');
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <ErrorDisplay />
          <Preview
            className={styles.preview}
            previewState={this.props.previewState}
            download={this.props.download}
            filters={this.props.filter}
            compState={this.props.compState}
          />
          <StateSelector
            className={styles.stateSelector}
            previewState={this.props.previewState}
            filters={this.props.filter}
          />
        </div>
        <div className={styles.right}>
          <ExportButton
            type={this.props.previewType}
            download={this.props.download}
            status={this.props.status}
            compState={this.props.compState}
          />
          <div className={styles.compositionWrapper}>
            <div className={styles.allComps}>All Comps&nbsp;&nbsp;<b>0</b></div>
            {
              Array.apply(null, {length: 6}).map(() => '—').map((item, i) => {
                return (
                  <div key={i} className={styles.listItem}>{item}</div>
                );
              })
            }
          </div>
          <div className={styles.controlWrapper}>
            <div className={styles.inlineWrapper}>
              <label>Select F1 Flavour</label>
              <Toggle 
                className={styles.toggleSwitch}
                type={this.props.previewType}
              />
            </div>
            <div className={styles.inlineWrapper}>
              <DownloadButton
                download={this.props.download}
                status={this.props.status}
              />
            </div>
            <textarea className={styles.fakeTextArea} ref="description" placeholder="Description" />
          </div>
          <button className={styles.fakeSubmitButton} onClick={this.handleSubmit.bind(this)}>Submit</button>
        </div>
      </div>
    );
  }
}

export default Landing;
