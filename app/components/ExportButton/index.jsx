import React from 'react';
import style from './style.css';
import mkdirp from 'mkdirp';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ExportActions from '../../actions/export';
import * as DownloadActions from '../../actions/download';
import * as FilterActions from '../../actions/filter';
import * as ErrorsAction from '../../actions/errors';

import aeToJSON from 'ae-to-json';
import ae from 'after-effects';

import classnames from 'classnames';
import frontWaveSvg from './front-wave.svg';
import backWaveSvg from './back-wave.svg';

import aeToReactF1 from 'exporters-react-f1';
import aeToF1Dom from'exporters-f1-dom';
import fs from 'fs';

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
    previewType: React.PropTypes.string
  };

  static defaultProps = {
    status: 'Synchronize'
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
            suggestion: 'Please try again.'
          });
        }
      });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.status === 'Synching') {
      this.props.setDownloadState(false);

      // This timeout is used to ensure the loading animation is in place before
      // executing after effects which may stall application for a few seconds.
      setTimeout(this.syncAfterEffects, 1000);
    }
  }

  syncAfterEffects = () => {
    return ae.execute(aeToJSON)
      .then((result) => {
        fs.writeFileSync(__dirname + '/ae-export.json', JSON.stringify(result));
        mkdirp(__dirname + '/output-react');
        mkdirp('./output-f1');
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
        const data = fs.readFileSync(__dirname + '/output-react/animation.json', 'utf-8');
        let datas = JSON.parse(data);
        let states = [];
        datas.forEach((item) => {
            states.push(item.from);
            states.push(item.to);
        });
        states = this.arrNoDupe(states);
        this.props.setFilters(states);
        this.props.setAESync('Synchronized');
        this.props.setDownloadState(true);
      })
      .catch((e) => {
        console.error(e);

        this.props.displayError({
          description: 'An unknown error has occured.',
          suggestion: 'Please contact a developer to resolve this.',
          error: e
        });

        this.props.setAESync('Unsync');
      });
  };

  componentWillAppear(cb) {
    this.animateIn().then(cb);
  }

  componentWillEnter(cb) {
    this.animateIn().then(cb);
  }

  componentWillLeave(cb) {
    this.animateOut().then(cb);
  }

  arrNoDupe = (a) => {
    let temp = {};
    for(let i = 0; i < a.length; i++) {
        temp[a[i]] = true;
    }
    return Object.keys(temp);
  }

  render() {
    const { setAESync, status } = this.props;
    const className = classnames(style.exporter, {
      [style.buttonSynchronizing]: status === 'Synching',
      [style.buttonSynchronized]: status === 'Synchronized'
    });

    return (
      <div className={className}>
        <div className={style.column}>
        <button className={style.exportButton} ref="exporter" onClick={() => setAESync('Synchronize')}>
          <div className={style.message}>{status}</div>
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
        previewType: state.previewType
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, ExportActions, DownloadActions, FilterActions, ErrorsAction ), dispatch);
}

const Exporter = connect(mapStateToProps, mapDispatchToProps)(ExportButton);

export default Exporter;
