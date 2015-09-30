var markIndentation = require('./mark-indentation')
var markers = require('./markers')
var parse = require('.')
var retrocycle = require('json-cycle').retrocycle
var tape = require('tape')
var tests = require('ogdl-tests')

var IN = markers.IN
var OUT = markers.OUT

tape.test('mark indentation', function(tape) {
  tape.equal(
    markIndentation([
      'a',
      '  b',
      'c' ].join('\n')),
    [ 'a',
      ( IN + 'b' ),
      ( OUT + 'c' ) ].join('\n'))
  tape.equal(
    markIndentation([
      'a',
      '  b',
      '   c',
      '   d',
      '  e',
      'f' ].join('\n')),
    [ 'a',
      ( IN + 'b' ),
      ( IN + 'c' ),
      ( 'd' ),
      ( OUT + 'e' ),
      ( OUT + 'f' )].join('\n'))
  tape.equal(
    markIndentation([
      'a',
      '\tb',
      '\t\tc',
      '\t\td',
      '\te',
      'f' ].join('\n')),
    [ 'a',
      ( IN + 'b' ),
      ( IN + 'c' ),
      ( 'd' ),
      ( OUT + 'e' ),
      ( OUT + 'f' )].join('\n'))
  tape.throws(function() {
    markIndentation([
      'a',
      '  \tb',
      'c' ].join('\n')) })
  tape.throws(function() {
    markIndentation([
      'a',
      '\tb',
      '  b',
      'c' ].join('\n')) })
  tape.end() })

tape.test('manual', function(tape) {
  tape.deepEqual(
    parse([ 'a', '  b' ].join('\n')),
    { a: ['b'] })
  tape.end() })

// tape.test('ogdl-tests', function(tape) {
//   tests.forEach(function(test) {
//     tape.test(test.spec, function(tape) {
//       tape.deepEqual(
//         parse(test.lines.join('\n')),
//         retrocycle(test.json)) }) })
//   tape.end() })
