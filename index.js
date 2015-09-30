var retrocycle = require('json-cycle').retrocycle
var parser = require('./parser')

module.exports = ogdlParse

function ogdlParse(markup) {
  return parser.parse(markup) }
