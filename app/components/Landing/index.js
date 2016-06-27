import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import classnames from 'classnames';
import styles from './style.css';

import ExportButton from '../ExportButton/index.jsx';
import StateSelector from '../StateSelector/index.jsx';
import Preview from '../Preview/index.jsx';
import ErrorDisplay from '../ErrorDisplay/index.jsx';
import CompositionSelector from '../CompositionSelector/index.jsx';
import DownloadButton from '../DownloadButton/index.jsx';
import Toggle from '../Toggle/index.jsx';
import EmailForm from '../EmailForm/index.jsx';

import * as ErrorsAction from '../../actions/errors';

import { EasyZip } from 'easy-zip';
import fs from 'fs';

import api_data from '../../api/api_data.json';
import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';

const { BrowserWindow } = require('electron').remote;

class Landing extends Component {
  static propTypes = {
    previewState: React.PropTypes.string,
    setDownloadState: React.PropTypes.func,
    previewType: React.PropTypes.string,
    download: React.PropTypes.bool,
    status: React.PropTypes.string,
    filter: React.PropTypes.array,
    emailTo: React.PropTypes.array,
    compState: React.PropTypes.bool,
    compName: React.PropTypes.string,
    compDownload: React.PropTypes.array,
    emailContacts: React.PropTypes.array,
    displayError: React.PropTypes.func
  };

  static defaultProps = {
    previewState: 'idle',
    download: false,
    status: 'Unsync',
    filter: [],
    compState: false
  };

  state = {
    submitText: 'SUBMIT',
    attachments: []
  }

  handleSubmit = () => {
    if(!this.props.download) return;
    let _this = this;
    this.setState({submitText: 'Submitting'});
    
    this.writeZip(() => {
      _this.sendMail();
    });
  };

  sendMail = () => {
    var opt = {
      auth: {
        api_key: api_data.key
      }
    };
    const mailer = nodemailer.createTransport(sgTransport(opt));

    let attachments = this.state.attachments.map((attachment) => {
      return {
        filename: attachment.split('/')[attachment.split('/').length - 1],
        path: attachment
      }
    });

    const email = {
      to: this.props.emailTo.map((e) => { return e.email }),
      from: 'ae-to-f1@jam3.com',
      subject: 'Ae to f1 export',
      text: this.refs.description.value || 'Ae Export',
      attachments
    };

    mailer.sendMail(email, (err, resp) => {
      this.setState({attachments: []});
      if(err) {
        this.props.displayError({
          description: err.message,
          suggestion: 'Make sure your after effects process is started.'
        });
      }
      else {
        this.setState({submitText: 'Submitted'});
      }
      
    });
  }

  openWiki = (val) => {
    const wikiWindow = new BrowserWindow({
      show: false,
      width: 1024,
      height: 768
    });
    wikiWindow.loadURL(`file://${__dirname}/wiki/${val}.html`);
    wikiWindow.show();
  }

  zipComp = (type, dir) => {
    const zip = new EasyZip();
    
    if(type === 'react') {
      const path = __dirname + '/output-react/' + (dir.length > 0 ? dir + '/' : '');
      zip.file(path + 'index.js', fs.readFileSync(path + 'index.js', 'utf-8'));
      zip.file(path + 'animation.json', fs.readFileSync(path + 'animation.json', 'utf-8'));
      zip.file(path + 'targets.json', fs.readFileSync(path + 'targets.json', 'utf-8'));
      let zipFolder = zip.folder(path + 'assets');
      fs.readdirSync(path + 'assets/').forEach((asset) => {
        zipFolder.file(path + 'assets/' + asset, fs.readFileSync(path + 'assets/' + asset));
      });
      // typo in module
      zip.writeToFileSycn(path + (dir.length > 0 ? dir + '.zip' : 'AE-Export.zip'));
    }
    else {
      const path = __dirname + '/output-f1/' + (dir.length > 0 ? dir + '/' : '');
      zip.file(path + 'index.js', fs.readFileSync(path + 'index.js', 'utf-8'));
      zip.file(path + 'animation.json', fs.readFileSync(path + 'animation.json', 'utf-8'));
      zip.file(path + 'targets.json', fs.readFileSync(path + 'targets.json', 'utf-8'));
      let zipFolder = zip.folder(path + 'assets');
      fs.readdirSync(path + 'assets/').forEach((asset) => {
        zipFolder.file(path + 'assets/' + asset, fs.readFileSync(path + 'assets/' + asset));
      });
      zip.writeToFileSycn(path + (dir.length > 0 ? dir + '.zip' : 'AE-Export.zip'));
    }
  }

  writeZip = (callback) => {
    let attachments = [];
    
    if(!this.props.compState) {
      if(this.props.previewType === 'react') {
        let path = __dirname + '/output-react/AE-Export.zip';
        attachments.push(path);
        this.setState({attachments});
        this.zipComp(this.props.previewType, '');
      }
      else {
        let path = __dirname + '/output-f1/AE-Export.zip';
        attachments.push(path);
        this.setState({attachments});
        this.zipComp(this.props.previewType, '');
      }  
    }
    else {
      if(this.props.previewType === 'react') {
        this.props.compDownload.forEach((item) => {
          let path = __dirname + '/output-react/' + item + '/' + item + '.zip';
          attachments.push(path);
          this.setState({attachments});
          this.zipComp(this.props.previewType, item);
        });
        this.setState({attachments});
      }
      else {
        this.props.compDownload.forEach((item) => {
          let path = __dirname + '/output-f1/' + item + '/' + item + '.zip';
          attachments.push(path);
          this.zipComp(this.props.previewType, item);
        });
        this.setState({attachments});
      }  
    }
    if(callback) callback();
  }

  render() {
    const submitClass = this.state.submitText === 'SUBMIT' 
      ? classnames(styles.fakeSubmitButton, styles.submit) : styles.fakeSubmitButton;
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
            compName={this.props.compName}
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
            compName={this.props.compName}
            compDownload={this.props.compDownload}
          />
          <CompositionSelector 
            compName={this.props.compName}
            compState={this.props.compState}
            compDownload={this.props.compDownload}
            fiter={this.props.filter}
            compState={this.props.filter}
            previewState={this.props.previewState}
          />
          <div className={styles.controlWrapper}>
            <div className={styles.inlineWrapper}>
              <label>Select F1 Flavour</label>
              <Toggle 
                className={styles.toggleSwitch}
                type={this.props.previewType}
              />
            </div>
            <div className={styles.inlineWrapper}>
              <EmailForm 
                contactList={this.props.emailContacts}
                emailTo={this.props.emailTo}
              />
              <DownloadButton
                download={this.props.download}
                status={this.props.status}
                compDownload={this.props.compDownload}
                compState={this.props.compState}
              />
            </div>
            <textarea className={styles.fakeTextArea} ref="description" placeholder="Description" />
            <h3> Need instructions or help? Click to view <br />  
              <p className={styles.wikiLink} onClick={this.openWiki.bind(this, 'Instructions')}>Instructions</p> Or
              <p className={styles.wikiLink} onClick={this.openWiki.bind(this, 'Rules-and-limitations')}>Help</p>
            </h3>
          </div>
          <button className={submitClass} onClick={this.handleSubmit.bind(this)}>{this.state.submitText}</button>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    emailTo: state.emailTo,
    download: state.download,
    compDownload: state.compDownload,
    previewType: state.previewType,
    compState: state.compState,
    compName: state.compName
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ErrorsAction, dispatch);
}

const LandingContainer = connect(mapStateToProps, mapDispatchToProps)(Landing);

export default LandingContainer;
