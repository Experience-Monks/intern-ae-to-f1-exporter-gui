import React from 'react';

var ReactDOM = require('react-dom');


function renderComponent(opts) {
	if(!opts.container || !opts.component ) {
		throw new Error('Missing Options in opts ' + opts);
	}
	opts.state = opts.state || 'idle';

	var Component = opts.component

	ReactDOM.render(
  	<Component state={opts.state} >
  	</Component>,
  	opts.container);

}

module.exports = renderComponent
