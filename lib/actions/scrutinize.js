var fs = require('fs'),
  _ = require('lowdash'),
  scrutinize = require('scrutinize'),
  jsonWrite = require('json-write'),
  writer = jsonWrite(),
  utils = require('../utils');

module.exports = function(callback) {
  scruntinize();
}

function scrutinize() {
  var config = utils.getConfig();
  var url = config.host + config.port;

  scrutinize(
    url,
    {
      key: config.apiKey
    },
    function(err, data) {
      if (err) {
        throw err;
      }

      console.log(data);
    }
  );
}
