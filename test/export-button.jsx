var ExportButton = require('../src/common/components/ExportButton/index');
var render = require('./utils/renderComponent');

var state = 'idle';
var opts;

require('domready')(function() {
	var container = document.createElement('div');
	document.body.style.background = '#FFF';
	document.body.appendChild(container);

	opts = {
		state: 'idle',
		component: ExportButton,
		container: container
	}

	render(opts);
});


window.onresize = function() {
	render(opts);
};


