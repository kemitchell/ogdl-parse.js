var parser = require('./parser')
var retrocycle = require('json-cycle').retrocycle
var markIndentation = require('./mark-indentation')

module.exports = ogdlParse

function ogdlParse(markup) {
  return retrocycle(parser.parse(markIndentation(markup))) }
