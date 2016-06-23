import React, { Component } from 'react';
import fs from 'fs';
import path from 'path';
import styles from './style.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as CompositionActions from '../../actions/compositions';
import * as FilterActions from '../../actions/filter';
import * as SelectStateActions from '../../actions/selectState';

import arrNoDupe from '../../utils/arrNoDupe';

class CompositionSelector extends Component {

	static propTypes = {
		compName: React.PropTypes.string,
		download: React.PropTypes.bool,
    setCompositionName: React.PropTypes.func,
    setAnimationState: React.PropTypes.func,
    setCompositionDownloads: React.PropTypes.func,
    compDownload: React.PropTypes.array,
    compState: React.PropTypes.bool,
    filter: React.PropTypes.array,
    setFilters: React.PropTypes.func,
    previewState: React.PropTypes.string
	};

	state = {
		comps: []
	};

	componentWillReceiveProps(nextProps) {
		if(nextProps.download) {
			const srcPath = __dirname + '/output-react/';
      const subDirectories = fs.readdirSync(srcPath).filter((file) => {
        return fs.statSync(path.join(srcPath, file)).isDirectory();
      });
      if(subDirectories.length > 1) {
        this.setState({comps: subDirectories});
      }	
      else {
        const name = JSON.parse(fs.readFileSync(__dirname + '/output-react/targets.json'));
        this.setState({comps: [name.src.split('.')[0]]});
      }	
		}
    if(nextProps.compName !== this.props.compName) {
      let states = [];
      let srcPath = __dirname + '/output-react/';
      if(this.props.compState) srcPath += nextProps.compName + '/';
      const data = fs.readFileSync(srcPath + 'animation.json', 'utf-8');
      let datas = JSON.parse(data);
      datas.forEach((item) => {
          states.push(item.from);
          states.push(item.to);
      });
      states = arrNoDupe(states);
      this.props.setAnimationState(states[0]);
      this.props.setFilters(states);
    }
	}

  handleCompClick = (item) => {
    this.props.setFilters([]);
    this.props.setCompositionName(item);
  }

	render() {
		const { compName, download, setCompositionName, setCompositionDownloads, setFilters } = this.props;
    let comps = [];
    this.state.comps.map((comp) => {
      comps.push(comp);
    });
    while (comps.length < 6) {
      comps.push('-');
    }

		if(!download) {
			return (
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
			);	
		}
		else {
      return (
        <div className={styles.compositionWrapper}>
          <div className={styles.allComps}>All Comps&nbsp;&nbsp;<b>{this.state.comps.length}</b></div>
          {
            comps.map((item, index) => {
              if(item === '-') {
                return (
                  <div key={index} className={styles.listItem} >
                    {item}
                  </div>
                );
              }
              else {
                return (
                  <div key={index} className={styles.listItem} onClick={this.handleCompClick.bind(this, item)}>
                    {item}
                    <div className={styles.circleContainer}>
                      <input
                        id={item}
                        key={index}
                        className={styles.checkbox}
                        type="checkbox"
                        value={item}
                        checked
                        onChange={() => setCompositionDownloads(item)}
                      /> 
                    </div> 
                  </div>
                );  
              }
              
            })
          }
        </div> 
      );	
		}
		
	}
}

function mapStateToProps(state) {
	return {
		compState: state.compState,
		compName: state.compName,
    compDownload: state.compDownload,
		setCompositionName: state.compName,
    setCompositionDownloads: state.compDownload,
    setAnimationState: state.previewState,
		download: state.download,
    filter: state.filter,
    setFilters: state.filter
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Object.assign({}, 
    CompositionActions, 
    FilterActions,
    SelectStateActions
  ), dispatch);
}

const CompositionSelectorContainer = connect(mapStateToProps, mapDispatchToProps)(CompositionSelector);

export default CompositionSelectorContainer;
