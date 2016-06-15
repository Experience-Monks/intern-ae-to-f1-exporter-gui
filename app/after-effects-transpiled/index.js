"use strict";

/*******************************************************************/
// DEPENDENCIES
/*******************************************************************/

var fs = require("fs"),
    vm = require("vm"),
    os = require("os"),
    path = require("path"),
    esc = require("jsesc"),
    is = require("is-explicit"),
    uuid = require("uuid"),
    q = require("q"),
    applescript = require("applescript"),
    uglify = require("uglify-js"),
    babel = require("babel-core");

/*******************************************************************/
// CONSTANTS
/*******************************************************************/

var BabelOptions = {
	presets: ["es2015"]
};

//These compression options are to satisfy After Effects old javascript engine.
var CompressionOptions = {
	conditionals: false
};

/*******************************************************************/
// DATA
/*******************************************************************/

var after_effects_app = null,
    includes = {},
    options = {};

/*******************************************************************/
// CODIFICATION
/*******************************************************************/

function codify_func(func, args) {
	if (func instanceof Function == false) throw new Error("first argument must be a function.");

	var code = babel.transform("$.lastResult = (" + func.toString() + ")", BabelOptions).code;

	//wraps the arguments provided as stringified json objects
	//and places in an apply call supplied with $.global, which
	//in after effects is the global namespace object, unless this
	//script is being called as a UI script
	var suffix = ".apply(this";

	if (args instanceof Array && args.length > 0) suffix += ", " + JSON.stringify(args);

	suffix += ");";

	//place the suffix in the code, removing the current
	//last character, because it would be a ;
	return code.slice(0, -1) + suffix;
}

function add_result_write_command(code, result_path) {
	return code + ("\n\n\t\t(function(result){\n\t\t\tvar file = File('" + result_path + "');\n\t\t\tfile.open('w');\n\n\t\t\tvar str = {\n\t\t\t\tlogs: typeof console == \"object\" && typeof console.clearCache == \"function\" ? console.clearCache() : ['No Cache'],\n\t\t\t\treturned: result\n\t\t\t}.toSource();\n\n\t\t\tfile.write(str);\n\t\t\tfile.close();\n\n\t\t\tdelete $.lastResult;\n\t\t})($.lastResult)").replace(/\t\t/g, "");
}

function add_error_handling(code) {
	return ("\n\t\tapp.beginSuppressDialogs();\n\t\ttry {\n\n\t\t" + code + "\n\n\t\t} catch (err) {\n\n\t\t$.lastResult = err instanceof Error ? err : new Error(err);\n\n\t\t}\n\t\tapp.endSuppressDialogs(false);\n\t\t").split("\t\t").join("");
}

function add_es5_shim(code) {
	if (!options.minify && !is(includes.es5_shim_code)) includes.es5_shim_code = fs.readFileSync(__dirname + "/lib/includes/es5-shim.jsx", 'utf8');else if (options.minify && !is(includes.es5_shim_code_min)) includes.es5_shim_code_min = fs.readFileSync(__dirname + "/lib/includes/es5-shim.min.jsx", 'utf8');

	var include = options.minify ? includes.es5_shim_code_min : includes.es5_shim_code;

	return include + ";" + code;
}

function add_ae_query(code) {
	if (!options.minify && !is(includes.aeQuery_code)) includes.aeQuery_code = fs.readFileSync(path.join(__dirname, "lib/includes/get.jsx"), 'utf8');else if (options.minify && !is(includes.aeQuery_code_min)) includes.aeQuery_code_min = fs.readFileSync(path.join(__dirname, "/lib/includes/get.min.jsx"), 'utf8');

	var include = options.minify ? includes.aeQuery_code_min : includes.aeQuery_code;

	return include + ";" + code;
}

function minify(code) {
	return uglify.minify(code, { fromString: true, compress: CompressionOptions }).code;
}

function escape_code_string(code) {

	return esc(code, { 'quotes': 'double' });
}

/*******************************************************************/
// HELPER
/*******************************************************************/

function get_execute_args(args) {
	var arr = Array.prototype.slice.call(args);
	arr.shift();

	return arr;
}

function statSync(path, err_callback) {
	try {
		return fs.statSync(path);
	} catch (err) {
		return is(err_callback, Function) ? err_callback(err) : err;
	}
}

function readdirSync(path, err_callback) {
	try {
		return fs.readdirSync(path);
	} catch (err) {
		return is(err_callback, Function) ? err_callback(err) : err;
	}
}

function validate_options(input_options) {
	var default_options = {
		errorHandling: true,
		es5Shim: true,
		aeQuery: true,
		minify: true,
		checkDir: "/Applications",
		appName: null
	};

	if (!is(input_options, Object)) input_options = {};

	/*
 	if (is(dir_to_check, String))
 		set_check_dir(dir_to_check);
 		app_name = is(app_name, String) ? app_name : null;
 		validate_os_and_ae();
 		if (after_effects_app.exists)
 		console.log(`Found at ${app_name || "After Effects"}` + after_effects_app.paths.app);
 	else
 		console.log(`${app_name || "After Effects"} could not be found.`);
 	*/

	options = {};
	for (var i in default_options) {
		options[i] = is(input_options[i], Boolean) ? input_options[i] : default_options[i];
	}
}

function find_ae_mac() {
	var ae_dir = null;
	var specified = is(options.appName, String);

	var files_in_check_dir = readdirSync(options.checkDir);
	if (is(files_in_check_dir, Error)) return;

	files_in_check_dir.forEach(function (checked) {
		if (specified && options.appName == checked || !specified && checked.includes("Adobe After Effects")) ae_dir = path.join(options.checkDir, checked);
	});

	if (ae_dir === null) return;

	//Add code to check which version of After Effects is installed, if at all.
	after_effects_app = {
		exists: true,
		execute: execute_mac,
		paths: {
			app: ae_dir,
			scripts: ae_dir + "/Scripts"
		}
	};
}

function execute_mac(str, result_path) {
	var do_result = is(result_path, String);
	var app_name = path.basename(this.paths.app);
	var apple_str = "tell application \"" + app_name + "\" to DoScript \"" + str + "\"";

	return q.nfcall(applescript.execString, apple_str).then(function () {
		//execString success

		if (do_result) return q.nfcall(fs.readFile, result_path, "utf-8"); //read result
	}, function (err) {
		//execString fail
		throw new Error("Error sending after effects command:\n" + err.message);
	}).then(function (data) {
		//fs.readFile success
		var result = vm.runInThisContext(data);
		fs.unlink(result_path);

		if (!is(result, Object)) throw new Error("Result from After Effects read error.");

		if (is(result.logs, Array) && result.logs.length > 0) result.logs.forEach(function (str) {
			return console.log(str);
		});

		if (result.returned instanceof Error) throw result.returned;else return result.returned;
	}, function (err) {
		//fs.readFile fail
		throw new Error("No Result from After Effects.");
	});
}

function find_ae_win() {
	throw new Error("Cannot yet find AE in windows.");
}

function execute_win(code, do_with_result, result_path) {
	throw new Error("Cannot yet execute code in windows.");
}

function validate_os_and_ae() {
	after_effects_app = { exists: false };

	var platform = os.platform();
	if (platform === "darwin") //mac
		find_ae_mac();else if (platform.includes("win")) //windows 32 or 64
		find_ae_win();else throw new Error("Cannot run After Effects commands in an environment it can't be installed in.");
}

function set_check_dir(value) {
	if (!is(value, String)) throw new Error("appDir must be a string.");

	var dir = path.normalize(value);
	var stat = statSync(dir);

	if (is(stat, Error) || !stat.isDirectory) throw new Error("appDir must be an existing directory");
}
/*******************************************************************/
// ON LOAD
/*******************************************************************/

validate_options();
validate_os_and_ae();

/*******************************************************************/
// EXPORTS
/*******************************************************************/

module.exports = {

	execute: function execute(funcOrPath /*, ...args*/) {
		if (!after_effects_app.exists) throw new Error("After Effects is not installed on this system, or it couldn't be found.");

		//Get And Create Code
		var code = null;
		var args = get_execute_args(arguments);

		if (is(funcOrPath, String)) {

			file = path.join(funcOrPath);
			code = fs.readFileSync(shimPath, 'utf8');
		} else if (is(funcOrPath, Function)) code = codify_func(funcOrPath, args);else throw new Error("First argument must be a path to a js file or a function.");

		if (options.errorHandling) code = add_error_handling(code);

		//Add Result Handling
		var result_path = "/tmp/after-effects-result-" + uuid.v4() + ".js";
		code = add_result_write_command(code, result_path);

		if (options.minify) code = minify(code);

		if (options.es5Shim) code = add_es5_shim(code);

		if (options.aeQuery) code = add_ae_query(code);

		code = escape_code_string(code);

		return after_effects_app.execute(code, result_path);
	},

	create: function create(func, targetPath) {
		if (!after_effects_app.exists) throw new Error("After Effects is not installed on this system, or it couldn't be found.");

		//Validate Arguments
		if (!is(func, Function)) throw new Error("First argument must be a function to turn into a script.");

		if (!is(targetPath, String)) throw new Error("Second argument must be the name for the created script.");

		//Create Code
		var code = codify_func(func);

		if (options.minify) code = minify(code);

		if (options.es5Shim) code = add_es5_shim(code);

		if (options.aeQuery) code = add_ae_query(code);

		//Write To Scripts
		var scriptPath = path.join(after_effects_app.paths.scripts, targetPath) + '.jsx';

		fs.writeFile(scriptPath, code, { flags: 'wx' }, function (err) {
			if (err) throw err;else console.log(path.basename(scriptPath) + " has been written to the After Effects Scripts folder.");
		});
	},

	options: function options(input_options) {
		if (!after_effects_app.exists) throw new Error("After Effects is not installed on this system, or it couldn't be found.");

		validate_options(input_options);
	}

};