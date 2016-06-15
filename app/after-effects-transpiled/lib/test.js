"use strict";

var ae = require("../after-effects");

ae.execute(function () {
	console.log("Hello from After Effects");
	return get().count();
}).then(function (num) {
	return console.log("There are " + num + " items, layers and properties in the current After Effects project.");
}).catch(function (err) {
	return console.log("After Effects Error: " + err.message);
});