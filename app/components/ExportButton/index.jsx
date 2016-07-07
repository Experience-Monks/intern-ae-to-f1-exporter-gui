import React from 'react';
import style from './style.css';
import mkdirp from 'mkdirp';
import fs from 'fs';
import rimraf from 'rimraf';
import path from 'path';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ExportActions from '../../actions/export';
import * as DownloadActions from '../../actions/download';
import * as FilterActions from '../../actions/filter';
import * as ErrorsAction from '../../actions/errors';
import * as SelectStateActions from '../../actions/selectState';
import * as MultiCompActions from '../../actions/multiComp';
import * as CompNameActions from '../../actions/compositions';
import * as CompositionDownloadActions from '../../actions/compositionDownloads';

import arrNoDupe from '../../utils/arrNoDupe';

import aeToJSON from 'ae-to-json';
import ae from 'after-effects';
import aeToReactF1 from 'exporters-react-f1';
import aeToF1Dom from 'exporters-f1-dom';

import classnames from 'classnames';
import frontWaveSvg from './front-wave.svg';
import backWaveSvg from './back-wave.svg';

const { BrowserWindow } = require('electron').remote;

ae.options.includes = [
    './node_modules/after-effects/lib/includes/console.js',
    './node_modules/after-effects/lib/includes/es5-shim.js',
    './node_modules/after-effects/lib/includes/get.js'
];

class ExportButton extends React.Component {
  static propTypes = {
    setAESync: React.PropTypes.func,
    setDownloadState: React.PropTypes.func,
    status: React.PropTypes.string,
    setFilters: React.PropTypes.func,
    setAnimationState: React.PropTypes.func,
    setCompositionName: React.PropTypes.func,
    compDownload: React.PropTypes.array,
    previewType: React.PropTypes.string
  };

  static defaultProps = {
    status: 'Synchronize'
  }

  state = {
    initialSync: false
  }

  componentDidMount() {
    const frontSvg = this.refs.waveAnimFront.firstChild;
    const backSvg = this.refs.waveAnimBack.firstChild;
    [frontSvg, backSvg].forEach(svg => {
      svg.classList.add(style.loading);
      svg.querySelector('.waterFill').classList.add(style.waterFill);
    });

    ae.execute(() => Boolean(app.project.file))
      .then((isSynced) => {
        if(!isSynced) {
          this.props.displayError({
            description: 'Error syncing with After Effects.',
            suggestion: 'Make sure your After Effects project is open.'
          });
        }
      });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.status === 'Synchronizing') {
      let _this = this;
      this.props.setDownloadState(false);

      // This timeout is used to ensure the loading animation is in place before
      // executing after effects which may stall application for a few seconds.
      setTimeout(() => {
        _this.syncAfterEffects();
      }, 1000);
    }
  }

  syncAfterEffects = () => {
    const win = BrowserWindow.getFocusedWindow();
    return ae.execute(aeToJSON)
    .then((result) => {
        win.focus();
        fs.writeFileSync(__dirname + '/ae-export.json', JSON.stringify(result));
        rimraf.sync(__dirname + '/output*');
        mkdirp.sync(__dirname + '/output-react');
        mkdirp.sync(__dirname + '/output-f1');
        aeToReactF1({
          pathJSON: __dirname + '/ae-export.json',
          pathOut: __dirname + '/output-react/'
        });
        aeToF1Dom({
          pathJSON: __dirname + '/ae-export.json',
          pathOut: __dirname + '/output-f1/'
        });
      })
      .then(() => {
        fs.unlinkSync(__dirname + '/ae-export.json');

        const srcPath = __dirname + '/output-react/';
        const subDirectories = fs.readdirSync(srcPath).filter((file) => {
          return fs.statSync(path.join(srcPath, file)).isDirectory();
        });
        let states = [];
        if(subDirectories.length > 1) {
          const data = fs.readFileSync(srcPath + subDirectories[0] + '/animation.json', 'utf-8');
          let datas = JSON.parse(data);
          datas.forEach((item) => {
              states.push(item.from);
              states.push(item.to);
          });
        }
        else {
          const data = fs.readFileSync(srcPath + 'animation.json', 'utf-8');
          let datas = JSON.parse(data);
          datas.forEach((item) => {
              states.push(item.from);
              states.push(item.to);
          });
        }
        states = arrNoDupe(states);
        this.props.setAESync('Synchronized');
        this.setState({initialSync: true});
        this.props.setAnimationState(states[0]);
        this.props.setFilters(states);
        if(subDirectories.length > 1) {
          this.props.setMultiCompState(true);
          this.props.setCompositionName(subDirectories[0]);
        }
        else this.props.setMultiCompState(false);

        this.props.setDownloadState(true);
        this.props.setCompositionDownloads([]);
        this.cleanAE();
      })
      .catch((e) => {
        this.props.displayError({
          description: e.message,
          suggestion: 'Make sure your after effects process is started.'
        });
        this.props.setAESync('Synchronized');
        this.props.setCompositionDownloads([]);
        this.cleanAE();
      });
  };

  cleanAE = () => {
    ae.execute(() => {
      app.purge(PurgeTarget.ALL_CACHES);
    });
  }

  componentWillAppear(cb) {
    this.animateIn().then(cb);
  }

  componentWillEnter(cb) {
    this.animateIn().then(cb);
  }

  componentWillLeave(cb) {
    this.animateOut().then(cb);
  }

  render() {
    const { setAESync, status } = this.props;
    const { initialSync } = this.state;
    const className = classnames(style.exporter, {
      [style.buttonSynchronizing]: status === 'Synchronizing',
      [style.buttonSynchronized]: status === initialSync
    });
    const statusText = status === 'Synchronize' && !initialSync ? 'Synchronize' : status === 'Synchronizing' ? 'Synchronizing' : 'Synchronized';

    return (
      <div className={className}>
        <div className={style.column}>
        <button className={style.exportButton} ref="exporter" onClick={() => setAESync('Synchronize')}>
          <div className={style.message}>{statusText}</div>
          <div ref="waveAnimBack" className={style.backWave} dangerouslySetInnerHTML={{ __html: backWaveSvg }}></div>
          <div ref="waveAnimFront" className={style.frontWave} dangerouslySetInnerHTML={{ __html: frontWaveSvg }}></div>
        </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        status: state.status,
        setAESync: state.status,
        setDownloadState: state.download,
        download: state.download,
        filter: state.filter,
        setFilters: state.filter,
        previewState: state.previewState,
        setAnimationState: state.previewState,
        compState: state.compState,
        setCompositionName: state.compName,
        compDownload: state.compDownload,
        setCompositionDownloads: state.compDownload,
        setMultiCompState: state.compState
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({},
    ExportActions,
    DownloadActions,
    FilterActions,
    ErrorsAction,
    SelectStateActions,
    MultiCompActions,
    CompNameActions,
    CompositionDownloadActions
    ), dispatch);
}

const Exporter = connect(mapStateToProps, mapDispatchToProps)(ExportButton);

export default Exporter;
