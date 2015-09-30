var parse = require('.')
var retrocycle = require('json-cycle').retrocycle
var tape = require('tape')
var tests = require('ogdl-tests')

tape.test('ogdl-tests', function(tape) {
  tests.forEach(function(test) {
    tape.test(test.spec, function(tape) {
      tape.deepEqual(
        parse(test.lines.join('\n')),
        retrocycle(test.json)) }) })
  tape.end() })
