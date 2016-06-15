module.exports = {
  local: {
    ASSET_PATH: '/assets/',
    gaID: ''
  },
  production: {
    ASSET_PATH: '/',
    gaID: ''
  },
  get ASSET_PATH () {
    return this[process.env.NODE_ENV || 'local'].ASSET_PATH;
  },
  get gaID () {
    return this[process.env.NODE_ENV || 'local'].gaID;
  },
};