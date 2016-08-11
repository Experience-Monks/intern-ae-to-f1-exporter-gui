import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import findDOMNode  from 'react-dom';
import * as ErrorsAction from '../../actions/errors';
import InlineSVG from 'svg-inline-react';
import style from './style.css';

const SCALE_X_MULTIPLIER = 0.5;
const SCALE_Y_MULTIPLIER = 0.01;

const React = require('react');
const ReactF1 = require('react-f1');
const aeToF1Dom = require('ae-to-f1-dom');
const fs = require('fs');
const merge = require('merge');
const mouseWheel = require('mouse-wheel');
// scoped var for event bindings
let node, mouseWheelListener, scrollTotal;

class ReactF1Preview extends React.Component {
  static propType = {
    previewState: React.PropTypes.string,
    displayError: React.PropTypes.func,
    compState: React.PropTypes.bool,
    compName: React.PropTypes.string
  }

  state = {
    style: {},
    aeOpts: {},
    assetNames: '',
    assetDir: '',
    dimensions: {}
  }

  componentDidMount = () => {
    node = findDOMNode.findDOMNode(this.refs.react);
    node.style.top = '0px';
    node.style.left = '0px';
    let scale = 1;
    let previewContainer = node.parentElement.parentElement;
    mouseWheelListener = mouseWheel(node, (dX, dY) => {
      if(dX !== undefined) {
        let moveValue = (parseInt(node.style.left.split('px')[0]) + dX * SCALE_X_MULTIPLIER) + 'px';
        moveValue = moveValue.split('px')[0];
        if(moveValue > previewContainer.clientWidth/2 || moveValue < -previewContainer.clientWidth/2 ) {
          return;
        }
        node.style.left = (parseInt(node.style.left.split('px')[0]) + dX * SCALE_X_MULTIPLIER) + 'px';
      }
      if(dY !== undefined) {
        if(node.style.transform.length <= 0) {
          node.style.transform = 'scale(' + scale + ','+ scale + ')';
        } 
        else {
          let scaleTo = (dY * 0.001);
          scale = scale + scaleTo;
          if(scale > 4 || scale < 0.5) {
            return; 
          }
          node.style.transform = 'scale(' + scale + ','+ scale + ')';
          let newScale = parseScaleTransform(node.style.transform);
          if(newScale[0] > 4 || newScale[1] > 4) {
            node.style.transform = 'scale( 4, 4)';
          }
        }
      }
    }, true);  
  }
  
  handleMouseDown = () => {
    window.addEventListener('mousemove', this.handleDrag, true);
  }

  handleDrag = (e) => {
    if(isNaN(parseInt(node.style.top)) || isNaN(parseInt(node.style.left))) {
      node.style.top = e.movementY + 'px';
      node.style.left = e.movementX + 'px';
    }
    else {
      node.style.top = parseInt(node.style.top.split('px')[0]) + e.movementY + 'px';
      node.style.left = parseInt(node.style.left.split('px')[0]) + e.movementX + 'px';
    }  
  }

  handleMouseUp = () => {
    window.removeEventListener('mousemove', this.handleDrag, true);
  }

  componentWillMount = () => {
    this.setAEProps();
  }

  componentWillUnmount = () => {
    if(node === undefined) node = findDOMNode.findDOMNode(this.refs.react);
    node.removeEventListener('wheel', mouseWheelListener);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.compName !== this.props.compName) {
      this.setAEProps(nextProps.compName);
    }
  }
  
  setAEProps(name) {
    let compName = '';
    if(this.props.compState) {
      name = name || '';
      compName = name.length > 0 ? name + '/' : this.props.compName + '/';
    } 

    const dataAsset = JSON.parse(fs.readFileSync(__dirname + '/output-react/' + compName + 'targets.json', {encoding: 'utf-8'}));
    const dataAnimation = JSON.parse(fs.readFileSync(__dirname + '/output-react/' + compName + 'animation.json', {encoding: 'utf-8'}));
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

  setFontFace(assetNames) {
    let fontFaces = [];
    assetNames.forEach(function(asset) {
      if(asset.data.font) {
        fontFaces.push(merge(asset.data.font, {src: asset.data.src}));
      }
    });
    var style = document.createElement('style');
    fontFaces.forEach(function(face) {
      var html = `
        @fontFace {
          font-family: ${face.font},
          src: ${'../../output-react/assets/' + face.src}
        }
      `;
      style.innerHTML += html;
    });
    document.head.appendChild(style);
  }

  render() {
    const { previewState, displayError, compState, compName } = this.props;
    const { handleMouseDown, handleMouseUp, handleDrag, handleScroll } = this;
    if(Object.keys(this.state.aeOpts).length === 0) return;
    const props = {
      states: aeToF1Dom.getStates(this.state.aeOpts),
      transitions: aeToF1Dom.getTransitions(this.state.aeOpts),
      go: previewState
    };

    const assetNames = this.state.assetNames;
    const styleContainer = {
      width: '100%',
      height: '100%',
      position: 'absolute',
      perspective: 555.5555555555555,
      WebkitPerspective: 555.5555555555555,
      MozPerspective: 555.5555555555555,
      WebkitTransformStyle: 'preserve-3d',
      MozTransformStyle: 'preserve-3d',
      transformStyle: 'preserve-3d'
    };
    this.setFontFace(assetNames); 
    const comp = compState ? compName : '';
    try {
      return(
        <div 
          ref='react-container'
          style={{
            width: '100%',
            height: '100%'
          }}
          className='react-container'
        >
          <ReactF1 
            {...props} 
            style={styleContainer}
            ref='react'
            className={style['react-container']}
            onMouseDown={handleMouseDown.bind(this)}
            onMouseUp={handleMouseUp.bind(this)}
            onMouseLeave={handleMouseUp.bind(this)}
            onTouchStart={handleMouseDown.bind(this)}
            onTouchEnd={handleMouseUp.bind(this)}
          >
            {
              assetNames.map((name, index) => {
                switch(name.data.src.split('.')[1]) {
                  case 'jpg':
                  case 'jpeg':
                  case 'png':
                  case 'gif':
                    return (
                      <img 
                        data-f1={name.key} 
                        className={style.react}
                        key={index}
                        src={__dirname + '/output-react/' + comp + '/assets/' + name.data.src} 
                        width={name.data.width} 
                        height={name.data.height} 
                        style={{
                          position: 'absolute', 
                          top: 0,
                          left: 0
                        }} 
                        alt={'preview-react'}
                      />
                    );
                  case 'mp4':
                  case 'ogg':
                  case 'webm':
                    return (
                      <video
                        autoPlay
                        loop
                        data-f1={name.key} 
                        className={style.react}
                        key={index}
                        src={__dirname + '/output-react/' + comp + '/assets/' + name.data.src} 
                        width={name.data.width} 
                        height={name.data.height} 
                        style={{
                          position: 'absolute', 
                          top: 0,
                          left: 0
                        }} 
                      >
                      </video>
                    );
                  case 'svg': 
                    return (
                      <div
                        data-f1={name.key} 
                        key={index}
                        className={style.react}
                        style={{
                          position: 'absolute',
                          width: name.data.width,
                          height: name.data.height,
                          top: 0,
                          left: 0,
                          overflow: 'visible'
                        }}
                      >
                        <InlineSVG 
                          src={
                            fs.readFileSync(__dirname + '/output-react/' + comp + '/assets/' + name.data.src).toString()
                          } 
                        />
                      </div>
                    );
                  case 'ttf':
                  case 'otf':
                  case 'ttc':
                  case 'dfont':
                    return (
                      <p 
                        data-f1={name.key}
                        className={style.react}
                        key={index}
                        style={{
                          position: 'absolute',
                          width: name.data.width,
                          height: name.data.height,
                          top: -name.data.font.fontSize + 'px',
                          left: 0,
                          overflow: 'visible',
                          color: 'rgb(' + parseInt(name.data.font.fillColor[0] * 256) + ',' + parseInt(name.data.font.fillColor[1] * 256) + ',' + parseInt(name.data.font.fillColor[2] * 256) +')',
                          fontFamily: name.data.font.font,
                          textAlign: name.data.font.justification,
                          fontSize: name.data.font.fontSize + 'px'
                        }}
                      >
                        {name.data.font.text}
                      </p>
                    );
                }
              })
            }
          </ReactF1>
        </div>
      );  
    }
    catch (e) {
       displayError({
        description: 'Preview rendering error: ' + e.message,
        suggestion: 'Please try again.',
        error: e.message
      });
    }
    
  }
}

function mapStateToProps(state) {
    return {
      previewState: state.previewState,
      compState: state.compState,
      compName: state.compName
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ErrorsAction, dispatch);
}

function parseScaleTransform(scale) {
  return scale.split('scale(')[1].split(')')[0].split(',');
}

const ReactF1PreviewContainer = connect(mapStateToProps, mapDispatchToProps)(ReactF1Preview);

export default ReactF1PreviewContainer;

