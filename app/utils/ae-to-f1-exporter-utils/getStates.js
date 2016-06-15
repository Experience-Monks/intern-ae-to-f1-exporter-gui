var getWriterForPropName = require('./getWriterForPropName');

module.exports = function(writers) {
  var getWriterForProp = getWriterForPropName(writers);

  return getStates;

  // this is the function that will create states and return them
  function getStates(opts) {
    return getStatesFromAnimation(opts.animation, opts.targets);
  }

  // this function will create the states from animation data
  function getStatesFromAnimation(animation, targets) {
    var states = {};

    animation.forEach(function(transition) {
      if(!states[ transition.from ]) {
        states[ transition.from ] = getState(transition.animation, targets, true);
      }

      if(!states[ transition.to ]) {
        states[ transition.to ] = getState(transition.animation, targets, false);
      }
    });

    return states;
  }

  // this funciton will return a state object for each piece of ui
  function getState(transition, targets, isFrom) {
    return Object.keys(transition).reduce(function(rVal, targetName) {
      var outTarget = {};
      var targetProps = targets[ targetName ];
      var targetAnimation = transition[ targetName ];
      
      parseStatic(outTarget, targetProps, targetAnimation);
      parseAnimated(outTarget, targetProps, targetAnimation, isFrom);

      rVal[ targetName ] = outTarget;

      return rVal;
    }, {});
  }

  // this function will grab states values for all static properties
  function parseStatic(out, targetProps, targetAnimation) {
    writeProperties(out, targetProps, targetAnimation.static);
  }

  // this function grab states values for all animated properties
  function parseAnimated(out, targetProps, targetAnimation, isFrom) {
    var properties = {};

    if(isFrom) {
      Object.keys(targetAnimation.animated).forEach(function(propName) {
        properties[ propName ] = getStartValue(targetAnimation.animated[ propName ]);
      });
    } else {
      Object.keys(targetAnimation.animated).forEach(function(propName) {
        properties[ propName ] = getEndValue(targetAnimation.animated[ propName ]);
      });
    }

    writeProperties(out, targetProps, properties);

    function getStartValue(animation) {
      // get value of first frame
      return animation[ 0 ][ 1 ];
    }

    function getEndValue(animation) {
      // get value of last frame
      return animation[ animation.length - 1 ][ 1 ];
    }
  }

  // this function will just write properties to the states object (used by parseAnimated and parseStatic)
  function writeProperties(out, targetProps, animationProperties) {
    var properties = animationProperties;

    Object.keys(properties).forEach(function(propertyName) {
      var propertyValue = properties[ propertyName ];
      var propWriter = getWriterForProp(propertyName);

      propWriter(out, targetProps, propertyValue);
    });
  }
};