var keyframes = require('keyframes');
var merge = require('deep-extend');
var bezierEasing = require('bezier-easing');
var getWriterForPropName = require('./getWriterForPropName');

module.exports = function(writers) {
  var getWriterForProp = getWriterForPropName(writers);
  
  return getTransitions;

  // this function will return an array of transition objects
  // the animation property will be a generated function which able
  // to handle keyframes, easing, etc from after effects
  function getTransitions(opts) {
    return opts.animation
    .map(function(transition) {
      if(!transition.bi) {
        return [{
          from: transition.from,
          to: transition.to,
          animation: getAnimation(transition, opts.targets, false)
        }];
      } else {
        return [
          {
            from: transition.from,
            to: transition.to,
            animation: getAnimation(transition, opts.targets, false)
          },
          {
            from: transition.to,
            to: transition.from,
            animation: getAnimation(transition, opts.targets, true)
          }
        ];
      }
    })
    .reduce(function(rVal, transitions) {
      return rVal.concat(transitions);
    }, []);
  }

  // this function will return a function which will perform all after effects
  // related animations
  function getAnimation(transition, uiTargets, isReversed) {
    var targets = transition.animation;
    var calculateValue = function(start, end, t) {
      var startKeyValue = start.value[ 1 ];
      var endKeyValue = end.value[ 1 ];
      var ease = start.value[ 2 ];

      // since this is a hold frame we'll just return it
      if(ease === 'hold') {
        return startValue;
      // this is a bezier ease
      } else if(Array.isArray(ease)) {
        ease = bezierEasing.apply(undefined, ease);

        if(Array.isArray(startKeyValue)) {
          return endKeyValue.map(function(endValue, i) {
            var startValue = startKeyValue[ i ];

            return (endValue - startValue) * ease(t) + startValue;  
          });
        } else {
          return (endKeyValue - startKeyValue) * ease(t) + startKeyValue;
        }

      // this is just a lerp
      } else {
        if(Array.isArray(startKeyValue)) {
          return endKeyValue.map(function(endValue, i) {
            var startValue = startKeyValue[ i ];

            return (endValue - startValue) * t + startValue;  
          });
        } else {
          return (endKeyValue - startKeyValue) * t + startKeyValue;
        }
      }
    };
    var animators = Object.keys(targets).reduce(function(keyframers, targetName) {
      var target = targets[ targetName ];
      var uiTarget = uiTargets[ targetName ]; // ui target contains the src and width and height

      var propKeyframers = Object.keys(target.animated).map(function(propName) {
        var frames = target.animated[ propName ];
        var animator = keyframes();
        var propWriter = getWriterForProp(propName);

        frames.forEach(function(frame) {
          animator.add({ time: frame[ 0 ], value: frame });
        });

        return function(time, ui) {
          propWriter(
            ui[ targetName ], 
            uiTarget, 
            animator.value(time, calculateValue)
          );
        };      
      });

      return keyframers.concat(propKeyframers);
    }, []);


    // this function will actually apply calculated states
    // based on the passed in animation data
    var animator = function(time, start) {
      var ui = merge(
        {},
        start
      );

      if(isReversed) {
        time = transition.duration - time;
      }

      animators.forEach(function(animator) {
        animator(time, ui);
      });

      return ui;
    };

    // f1 requires that the function have a duration defined on it
    // otherwise the duration will be the default duration of 0.5
    // instead we'll use the duration AE is passing
    animator.duration = transition.duration;

    return animator;
  }
};