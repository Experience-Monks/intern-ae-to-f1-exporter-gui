module.exports.suggestion = function(error) {
  switch(error.message) {
    case 'No Result from After Effects.':
      return 'Please restart after effects';
    case 'Cannot convert undefined or null to object':
      return 'Make sure you have a project open.'
    default:
      return 'Unkown Error, please ask a dev for assistance or consult the documentation.'
  }
}

module.exports.error = function(error) {
  if(error.message) {
    if(error.message.length > 100) {
      return error.message.match(/(.{1,100})/g)[0];
    }
    else return error.message;  
  }
  else if(typeof error === 'string') {
    if(error.length > 100) {
      return error.match(/(.{1,100})/g)[0];
    }
    else return error;   
  }
  else return 'Unkown error';
  
}