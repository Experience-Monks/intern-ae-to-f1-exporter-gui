import React from 'react';
import animate from 'gsap-promise';
import style from './style.css';
import mkdirp from 'mkdirp';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ExportActions from '../../actions/export';
import * as DownloadActions from '../../actions/download';
import * as FilterActions from '../../actions/filter';

import aeToJSON from 'ae-to-json';
import ae from 'after-effects';

import aeToReactF1 from 'exporters-react-f1';
import aeToF1Dom from 'exporters-f1-dom';
import fs from 'fs';

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
    };

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
        this.setState({ statusMessage: 'Synchronizing'});
        this.props.setDownloadState(false);
        this.props.setAESync('Synching');
        ae.execute(aeToJSON)
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
                this.setState({ statusMessage: 'Synchronized' });
             
            })
            .catch((e) => {
                this.setState({ statusMessage: 'Synch Failed' });
                this.props.setAESync('Unsync');
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

    arrNoDupe = (a) => {
        let temp = {};
        for(let i = 0; i < a.length; i++) {
            temp[a[i]] = true;
        }
        return Object.keys(temp);
    }

    render() {
        const { setAESync, status } = this.props;
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
        download: state.download,
        filter: state.filter,
        setFilters: state.filter,
        previewType: state.previewType
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, ExportActions, DownloadActions, FilterActions), dispatch);
}

const Exporter = connect(mapStateToProps, mapDispatchToProps)(ExportButton);

export default Exporter;
