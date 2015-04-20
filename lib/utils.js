#!/usr/bin/env node

var _ = require('lodash');
var prettyjson = require('prettyjson');
var ProgressBar = require('progress');
var fs = require('fs');
var path = require('path');

module.exports = {
	getActions: function() {
		var actions = {};
		var actionFileList = fs.readdirSync(path.join(__dirname, './actions'));

		function indexAction(fileName) {
			var action = require(path.join(__dirname, './actions', fileName));

			var actionName = _.camelCase(fileName.replace('.js', ''));

			actions[actionName] = action;
		}

		_.forEach(actionFileList, indexAction);

		return actions;
	},
	getConfig: function() {
		return require('./config');
	},
	printJSON: function(obj) {
		var options = {
			stringColor: 'yellow'
		}

		obj = _.omit(obj, function(value) {
			return !value;
		});

		console.log(prettyjson.render(obj, options));
	},

	statusMessage: function(number, itemName) {
		console.log((number > 1) ? ('Adding ' + number + ' ' + itemName + 's...') : ('Adding ' + itemName + '...'));
	}
}
