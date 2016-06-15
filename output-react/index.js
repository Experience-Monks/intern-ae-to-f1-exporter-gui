var React = require('react');
var ReactF1 = require('react-f1');
var animation = require('./animation');
var targets = require('./targets');
var aeToF1Dom = require('ae-to-f1/f1-dom/');

module.exports = function(props) {
  var assetPath = props.assetPath || 'assets/';

  // add in after effects exported animation and targets
  // this will be used by getStates and getTransitions
  var aeOpts = {
    animation: animation,
    targets: targets
  };

  props = Object.assign(
    {
      states: aeToF1Dom.getStates(aeOpts),
      transitions: aeToF1Dom.getTransitions(aeOpts)
    },
    props
  );

  
  var styleContainer = Object.assign(
    props.style,
    {
      width: 400,
      height: 640,
      perspective: 555.5555555555555,
      WebkitPerspective: 555.5555555555555,
      MozPerspective: 555.5555555555555,
      WebkitTransformStyle: 'preserve-3d',
      MozTransformStyle: 'preserve-3d',
      transformStyle: 'preserve-3d',
      WebkitTransformOrigin: '50% 50%',
      MozTransformOrigin: '50% 50%',
      transformOrigin: '50% 50%'
    }
  );

  return <ReactF1 
    {...props}
    style={styleContainer}
  >
      <img data-f1="jam3LogoTest png" src={assetPath + 'jam3Logo.png'} width={500} height={500} style={{position: "absolute", left: 0, top: 0}} /> 
</ReactF1>;
};