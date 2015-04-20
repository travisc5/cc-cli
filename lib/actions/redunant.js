var fs = require('fs');
var _ = require('lowdash');
var css = require('css');

var utils = require('../utils');

module.exports = function(callback) {
  fs.readdir(
    '../../input',
    function(err, files) {
    if (err) {
      throw err;
    }
    else {
      if (files.length) {
        _.forEach(
          files,
          function(file) {
            if (file.match(/(?=(mixins))/) || file.match(/(?=(compass))/)) {
              return "Please place compiled CSS files in this input";
            }
            else {
                var obj = cssParse(file, true, true);
                console.log(obj);
            }
          }
        );
      }
    }
  });
}

function cssParse(file, silent, map) {
  var cssString = cssString(file);
  var ast = css(
    cssString,
    {
      silent: silent,
      source: file
    }
  );

  return css.stringify(
    ast,
    {
      sourcemap: map
    }
  );
}

function cssString(file) {
  var string = fs.readFile(file, function(err, data) {
    if (err) {
      throw err;
    }
    return data;
  });
  return string
}
