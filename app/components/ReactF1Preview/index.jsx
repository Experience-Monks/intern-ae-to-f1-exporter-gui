import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ErrorsAction from '../../actions/errors';

const React = require('react');
const ReactF1 = require('react-f1');
const aeToF1Dom = require('ae-to-f1-dom');
const fs = require('fs');

class ReactF1Preview extends React.Component {
	static propType = {
        previewState: React.PropTypes.string,
        displayError: React.PropTypes.func
  }

	state = {
		style: {},
		aeOpts: {},
		assetNames: '',
		dimensions: {}
	}

	componentWillMount = () => {
		const dataAsset = JSON.parse(fs.readFileSync(__dirname + '/output-react/targets.json', {encoding: 'utf-8'}));
		const dataAnimation = JSON.parse(fs.readFileSync(__dirname + '/output-react/animation.json', {encoding: 'utf-8'}));
    const assetNames = [];
    if(Object.keys(dataAsset).length === 0 || Object.keys(dataAnimation).length === 0) {
      this.setState({ aeOpts: {} });
      this.props.displayError({
        description: 'An error occured retrieving f1 animation data.',
        suggestion: 'Make sure your composition is compatible with the ae-to-f1 exporter.'
      });
    }
		else {
      Object.keys(dataAsset).forEach((key) => {
        assetNames.push({
          key,
          data: dataAsset[key]
        });
      });

      this.setState({
        aeOpts: {
          animation: dataAnimation,
          targets: dataAsset
        },
        assetNames
      });
    }

	}
	
	render() {
		const { previewState, displayError } = this.props;
    if(Object.keys(this.state.aeOpts).length === 0) return;

		const props = {
			states: aeToF1Dom.getStates(this.state.aeOpts),
			transitions: aeToF1Dom.getTransitions(this.state.aeOpts),
			go: previewState
		};
		const styleContainer = {
			width: this.state.dimensions.width || 500,
			height: this.state.dimensions.height || 500,
			perspective: 555.5555555555555,
			WebkitPerspective: 555.5555555555555,
			MozPerspective: 555.5555555555555,
			WebkitTransformStyle: 'preserve-3d',
			MozTransformStyle: 'preserve-3d',
			transformStyle: 'preserve-3d',
			WebkitTransformOrigin: '50% 50%',
			MozTransformOrigin: '50% 50%',
			transformOrigin: '50% 50%'
		};
		const assetNames = this.state.assetNames;
		try {
      return(
        <ReactF1 {...props} style={styleContainer}>
          {
            assetNames.map((name, index) => {
              return (
                <img 
                  data-f1={name.key} 
                  key={index}
                  src={__dirname + '/output-react/assets/' + name.data.src} 
                  width={name.data.width || 500} 
                  height={name.data.height || 500} 
                  style={{position: 'absolute', left: 0, top: 0}} 
                  alt={'preview-react'}
                />
              );
            })
          }
        </ReactF1>
      );	
		}
    catch (e) {
       displayError({
        description: 'An error occured rendering the preview.',
        suggestion: 'Please try again.',
        error: e.message
      });
    }
		
	}
}

function mapStateToProps(state) {
    return {
        previewState: state.previewState,
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ErrorsAction, dispatch);
}

const ReactF1PreviewContainer = connect(mapStateToProps, mapDispatchToProps)(ReactF1Preview);

export default ReactF1PreviewContainer;

