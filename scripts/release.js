var packager = require('electron-packager')

console.log(__dirname + '/../build');

var options = {
 arch: 'all',
 dir: __dirname + '/../build',
 platform: 'darwin'
};

packager(options, function done_callback (err, appPaths) {
  if(err) console.log(err)
})