import React from 'react';
import animate from 'gsap-promise';
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
import arrUnique from 'array-unique';
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
    status: 'Unsync'
  }

  state = {
    statusMessage: 'Synchronize'
  };

  componentDidMount() {
    const frontSvg = this.refs.waveAnimFront.firstChild;
    const backSvg = this.refs.waveAnimBack.firstChild;
    [frontSvg, backSvg].forEach(svg => {
      svg.classList.add(style.loading);
      svg.querySelector('.waterFill').classList.add(style.waterFill);
    })

    ae.execute(() => Boolean(app.project.file))
      .then((isSynced) => {
        if(isSynced) this.setState({ init: true, statusMessage: 'synchronize' });
        else {
          this.props.displayError({
            title: 'Error syncing with After Effects.',
            suggestion: 'Please try again.'
          });
          this.setState({ init: true, statusMessage: 'failed to synchronize' });
        }
      });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.status === 'Synchronize') {
      this.setState({ statusMessage: 'Synchronizing'});
      this.props.setAESync('Synching');

      // This timeout is used to ensure the loading animation is in place before
      // executing after effects which may stall application for a few seconds.
      setTimeout(this.syncAfterEffects, 1000);
    }
  }

  syncAfterEffects = () => {
    const outputType = this.props.previewType === 'f1Dom' ? 'react' : 'f1Dom';

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
        this.props.setAESync('Synchronized');
        this.props.setDownloadState(true);
        this.setState({ statusMessage: 'Synchronized' });
        fs.unlinkSync(__dirname + '/ae-export.json');

        if(outputType === 'react') this.readTransitionsF1();
        else this.readTransitionsReact();
      })
      .catch((e) => {
        console.error(e);

        this.props.displayError({
          title: 'An unknown error has occured.',
          suggestion: 'Please contact a developer to resolve this.',
          error: e
        });

        this.setState({ statusMessage: 'Synch Failed' });
        this.props.setAESync('Unsync');
      });
  };

  readTransitionsReact = () => {
    fs.readFile(__dirname + '/output-react/animation.json', 'utf-8', (err, data) => {
      if (err) console.error(err);
      let datas = JSON.parse(data);
      let states = [];
      datas.forEach((item) => {
          states.push(item.from);
          states.push(item.to);
      }); 
      states = arrUnique(states);
      this.props.setFilters(states);
    });
  }

  readTransitionsF1 = () => {
    fs.readFile(__dirname + '/output-f1/animation.json', 'utf-8', (err, data) => {
      if (err) console.error(err);
      let datas = JSON.parse(data);
      let states = [];
      datas.forEach((item) => {
          states.push(item.from);
          states.push(item.to);
      }); 
      states = arrUnique(states);
      this.props.setFilters(states);
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
    // const className = classnames(style.exporter, {
    //   [style.buttonSynchronizing]: status === 'Syncing',
    //   [style.buttonSynchronized]: status === 'Synchronized'
    // });

    // The above should be the correct code, but since store isnt working yet
    const className = classnames(style.exporter, {
      [style.buttonSynchronizing]: this.state.statusMessage === 'Synchronizing',
      [style.buttonSynchronized]: this.state.statusMessage === 'Synchronized'
    });

    return (
      <div className={className}>
        <div className={style.column}>
        <button className={style.exportButton} ref="exporter" onClick={() => setAESync(status)}>
          <div className={style.message}>{this.state.statusMessage}</div>
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
