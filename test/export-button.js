const ExportButton = require('../src/common/components/ExportButton/index');
const render = require('./utils/renderComponent');
const domready = require('domready');

let opts;

domready(() => {
	let container = document.createElement('div');
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
