import React from 'react';
import animate from 'gsap-promise';
import style from './style.css';
import mkdirp from 'mkdirp';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ExportActions from '../../actions/export';


const aeToJSON = require('ae-to-json');
const ae = require('after-effects');
const getTargets = require('../../utils/ae-to-f1-exporter-utils/getTargets');
const exportToF1 = require('ae-to-f1-exporter');
const aeToReactF1 = require('exporters-react-f1');
const aeToF1Dom = require('exporters-f1-dom');

function noop() {}

class ExportButton extends React.Component {

  static propTypes = {
    setAESync: React.PropTypes.func,
    status: React.PropTypes.string,
    type: React.PropTypes.string.isRequired
  };

  static defaultProps = {
    status: 'Unsync',
    type: 'f1Dom'
  }

  state = {
    statusMessage: 'Synchronize'
  }  

	constructor(props) {
		super(props);
	}

	componentDidMount() {
    this.animateIn();
    ae.execute(() => Boolean(app.project.file))
       .then( (isSynced) => {
        console.log(this);
         if(isSynced) this.setState({ init: true, statusMessage: 'ready to synchronize' })
         else this.setState({ init: true, statusMessage: 'failed to synchronize' })        
       });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.status === 'Synchronize') {
      let outputType = nextProps.type === 'f1-dom' ? 'f1Dom' : 'react';
      let _this = this;
      this.setState({ statusMessage: 'Synchronizing'})
      ae.execute(aeToJSON)
        .then((result) => {
          let targetToCopy = getTargets(result);
          let srcTargets = [];
          Object.keys(targetToCopy).forEach((key) => {
            srcTargets.push(targetToCopy[key].src);
          });
          global.fs.writeFileSync('./ae-export.json', JSON.stringify(result) );
          if(outputType === 'react') {
            mkdirp('./output-react');
            aeToReactF1({
              pathJSON: './ae-export.json',
              pathOut: './output-react/'
            });
           // srcTargets.forEach((target) => {
           //   fs.copy(target, './output-react/assets/');
           // });
          }
          else {
            mkdirp('./output-f1');
            aeToF1Dom({
              pathJSON: './ae-export.json',
              pathOut: './output-f1/'
            });
          //  srcTargets.forEach((target) => {
          //    fs.copy(target, './output-f1/assets/');
          //  });
          }
      })
      .then(() => {
        _this.props.setAESync('Synched');
        this.setState({ statusMessage: 'Synchronized'})
        fs.unlinkSync('./ae-export.json');
      })
      .catch(function(e) {
        this.setState({ statusMessage: 'Synch Failed'})
        console.error(e);
      });
    
    }

    
  }
	
	componentWillAppear(cb) {
	  this.animateIn().then(cb);
	}
	
	componentWillEnter (cb) {
	  this.animateIn().then(cb);
	}
	
	componentWillLeave(cb) {
	  this.animateOut().then(cb)
	}
	
	animateIn = () => {
	  return animate.to(this.refs.exporter, 0.3, { opacity: 1, ease: Quad.easeOut });
	}
	
	animateOut = () => {
	  return animate.to(this.refs.exporter, 0.3, { opacity: 0, ease: Quad.easeOut });
  }

render () {
    const { setAESync, status } = this.props;
  	return (
  		<div className={style.exporter}  >
    		  <div className={style.column}>
    		    <button className={style.exportButton} ref='exporter' onClick={ () => setAESync(status) }>
              {this.state.statusMessage}
            </button>
    		  </div>
    		</div>
  	);
  }
}

function mapStateToProps(state) {
  return {
    status: state.status
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ExportActions, dispatch);
}

const Exporter = connect(mapStateToProps, mapDispatchToProps)(ExportButton);

export default Exporter;