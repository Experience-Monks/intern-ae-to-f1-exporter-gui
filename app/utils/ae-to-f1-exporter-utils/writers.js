module.exports = {
  writeAnchorPoint: function(out, targetProps, value) {
    out = out.style || (out.style = {});

    out.transformOrigin = [
      value[ 0 ] / targetProps.width,
      value[ 1 ] / targetProps.height
    ];

    out.marginLeft = out.transformOrigin[ 0 ] * -targetProps.width;
    out.marginTop = out.transformOrigin[ 1 ] * -targetProps.height;
  },

  writeOpacity: function(out, targetProps, value) {
    out = out.style || (out.style = {});

    out.opacity = value / 100;
  },

  writePosition: function(out, targetProps, value) {
    out = out.style || (out.style = {});

    out.translate = value.slice();

    // z is inverted in ae
    out.translate[ 2 ] = -out.translate[ 2 ];
  },

  writeScale: function(out, targetProps, value) {
    out = out.style || (out.style = {});

    out.scale = value.map(function(value) {
      return value / 100;
    });
  },

  writeRotationX: function(out, targetProps, value) {
    out = out.style || (out.style = {});

    out.rotate = out.rotate || [0, 0, 0];

    // rotation values are inverted in ae vs browser
    out.rotate[ 0 ] = -value;
  },

  writeRotationY: function(out, targetProps, value) {
    out = out.style || (out.style = {});

    out.rotate = out.rotate || [0, 0, 0];

    // rotation values are inverted in ae vs browser
    out.rotate[ 1 ] = -value;
  },

  writeRotationZ: function(out, targetProps, value) {
    out = out.style || (out.style = {});
    
    out.rotate = out.rotate || [0, 0, 0];

    out.rotate[ 2 ] = value;
  }
};