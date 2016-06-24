import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './style.css';

import ExportButton from '../ExportButton/index.jsx';
import StateSelector from '../StateSelector/index.jsx';
import Preview from '../Preview/index.jsx';
import ErrorDisplay from '../ErrorDisplay/index.jsx';
import CompositionSelector from '../CompositionSelector/index.jsx';
import DownloadButton from '../DownloadButton/index.jsx';
import Toggle from '../Toggle/index.jsx';
import EmailForm from '../EmailForm/index.jsx';

import nodemailer from 'nodemailer';
import zip from 'zip-folder';

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
    emailContacts: React.PropTypes.array
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
    const transport = nodemailer.createTransport('direct');
    let emailList = this.extractEmailFromProp(this.props.emailTo);
    this.writeZip(() => {
      let attachments = [];
      _this.state.attachments.forEach((attachment) => {
        let attachName = attachment.split('/');
        attachName = attachName[attachName.length - 1];
        attachments.push({
          fileName: attachName,
          filePath: attachment
        });
      });
      transport.sendMail({
          from: 'noreply@jam3.com',
          to: emailList,
          subject: 'After Effects to F1 Export',
          text: _this.refs.description.value || 'AE to F1 Export',
          attachments: attachments
      }, (err) => {
        if(err) console.warn(err);
        else this.setState({submitText: 'Submitted'});
      });
    });
  };

  extractEmailFromProp = (prop) => {
    let emailList = [];
    prop.forEach((item) => {
      emailList.push(item.email);
    });
    return emailList;
  }

  writeZip = (callback) => {
    let _this = this;
    let attachments = [];
    
    if(!this.props.compState) {
      if(this.props.previewType === 'react') {
        this.props.compDownload.forEach((item) => {
          let path = __dirname + '/output-react/' + item + '.zip';
          attachments.push(path);
          zip(__dirname + '/output-react', path, (err) => {
            if(err) console.log(err);
            else {
              _this.setState({attachments});
              callback();
            }
          });
        });
      }
      else {
        this.props.compDownload.forEach((item) => {
          let path = __dirname + '/output-f1/' + item + '.zip';
          attachments.push(path);
          zip(__dirname + '/output-f1', path, (err) => {
            if(err) console.log(err);
            else {
              _this.setState({attachments});
              callback();
            }
          });
        });
      }  
    }
    else {
      if(this.props.previewType === 'react') {
        this.props.compDownload.forEach((item) => {
          let path = __dirname + '/output-react/' + item + '.zip';
          attachments.push(path);
          zip(__dirname + '/output-react/' + item, path, (err) => {
            if(err) console.log(err);
            else {
              _this.setState({attachments});
              callback();
            }
          });
        });
      }
      else {
        this.props.compDownload.forEach((item) => {
          let path = __dirname + '/output-f1/' + item + '.zip';
          attachments.push(path);
          zip(__dirname + '/output-f1/' + item, path, (err) => {
            if(err) console.log(err);
            else {
              _this.setState({attachments});
              callback();
            }
          });
        });
      }  
    }
    
  }

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
          </div>
          <button className={styles.fakeSubmitButton} onClick={this.handleSubmit.bind(this)}>{this.state.submitText}</button>
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
    compState: state.compState
  };
}
const LandingContainer = connect(mapStateToProps)(Landing);

export default LandingContainer;
