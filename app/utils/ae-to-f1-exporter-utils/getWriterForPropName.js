module.exports = function(writers) {
  var writeAnchorPoint = writers.writeAnchorPoint;
  var writeOpacity = writers.writeOpacity;
  var writePosition = writers.writePosition;
  var writeScale = writers.writeScale;
  var writeRotationX = writers.writeRotationX;
  var writeRotationY = writers.writeRotationY;
  var writeRotationZ = writers.writeRotationZ;

  return function(propName) {
    var propWriter;

    switch(propName) {
      case 'anchorPoint':
        propWriter = writeAnchorPoint;
      break;

      case 'opacity':
        propWriter = writeOpacity;
      break;

      case 'position': 
        propWriter = writePosition;
      break;

      case 'scale':
        propWriter = writeScale;
      break;

      case 'rotationX':
        propWriter = writeRotationX;
      break;

      case 'rotationY':
        propWriter = writeRotationY;
      break;

      case 'rotationZ':
        propWriter = writeRotationZ;
      break;
    }

    return propWriter;
  };
};