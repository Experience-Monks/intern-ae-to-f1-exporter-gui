var writers = require('./writers');
var getStates = require('./getStates');
var getTransitions = require('./getTransitions');

module.exports = {
  getStates: getStates(writers),
  getTransitions: getTransitions(writers)
};