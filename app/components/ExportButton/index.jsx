import React from 'react';
import animate from 'gsap-promise';
import style from './style.css';
import mkdirp from 'mkdirp';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ExportActions from '../../actions/export';
import * as DownloadActions from '../../actions/download';

import aeToJSON from 'ae-to-json';
import ae from 'after-effects';

ae.options.includes = [
    './node_modules/after-effects/lib/includes/console.js',
    './node_modules/after-effects/lib/includes/es5-shim.js',
    './node_modules/after-effects/lib/includes/get.js'
];

import aeToReactF1 from 'exporters-react-f1';
import aeToF1Dom from'exporters-f1-dom';
import fs from 'fs';

class ExportButton extends React.Component {
    static propTypes = {
        setAESync: React.PropTypes.func,
        setDownloadState: React.PropTypes.func,
        status: React.PropTypes.string
    };

    static defaultProps = {
        status: 'Unsync'
    }

    state = {
        statusMessage: 'Synchronize'
    };

    componentDidMount() {
        this.animateIn();
        ae.execute(() => Boolean(app.project.file))
            .then((isSynced) => {
                if(isSynced) this.setState({ init: true, statusMessage: 'ready to synchronize' });
                else this.setState({ init: true, statusMessage: 'failed to synchronize' });
            });
    }

  componentWillReceiveProps(nextProps) {
    if(nextProps.status === 'Synchronize') {
        let outputType = nextProps.type === 'f1-dom' ? 'f1Dom' : 'react';
        this.setState({ statusMessage: 'Synchronizing'});
        ae.execute(aeToJSON)
            .then((result) => {
                console.log('dir ' + __dirname);
                fs.writeFileSync( __dirname + '/ae-export.json', JSON.stringify(result));
                if(outputType === 'react') {
                    mkdirp(__dirname + '/output-react');
                    aeToReactF1({
                        pathJSON: __dirname + '/ae-export.json',
                        pathOut: __dirname + '/output-react/'
                    });
                }
                else {
                    mkdirp('./output-f1');
                    aeToF1Dom({
                        pathJSON: __dirname + '/ae-export.json',
                        pathOut: __dirname + '/output-f1/'
                    });
                }
            })
            .then(() => {
                this.props.setAESync('Synchronized');
                this.props.setDownloadState(true);
                this.setState({ statusMessage: 'Synchronized' });
                fs.unlinkSync(__dirname + '/ae-export.json');
            })
            .catch((e) => {
                this.setState({ statusMessage: 'Synch Failed' });
                console.error(e);
            });
        }
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
	
	animateIn = () => {
        return animate.to(this.refs.exporter, 0.3, { opacity: 1, ease: Quad.easeOut });
	}
	
	animateOut = () => {
        return animate.to(this.refs.exporter, 0.3, { opacity: 0, ease: Quad.easeOut });
    }

render() {
    const { setAESync, status} = this.props;
    return (
        <div className={style.exporter}>
            <div className={style.column}>
            <button className={style.exportButton} ref="exporter" onClick={() => setAESync(status)}>
              {this.state.statusMessage}
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
    download: state.download
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, ExportActions, DownloadActions), dispatch);
}

const Exporter = connect(mapStateToProps, mapDispatchToProps)(ExportButton);

export default Exporter;
