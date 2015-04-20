#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var program = require('commander');
var userhome = require('userhome');

if (!fs.existsSync(userhome('.lws.json'))) {
	require('../lib/config').init();
}

program
	.version(require('../package.json').version)
	.command('scrutiniize', 'Scrutinize CSS file.')
	.command('get', 'Get an object from the database.')
	.command('config', 'Configure LWS.');

// Some logic that searches global dirs and finds modules
// Each calls 'program.command()'

program.parse(process.argv);

if (!process.argv.slice(2).length) {
	program.outputHelp();
}
