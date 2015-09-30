var Generator = require('jison').Generator

var options = {
  type: 'slr',
  moduleType: 'commonjs',
  moduleName: 'ogdl' }

var quote = function(argument) {
  return '\'' + argument + '\'' }

var tokens = {
  NEWLINE: '\\n',
  TAB: '\\t',
  SPACE: ' ',
  HTAB: '\\h' }

var grammar = {
  lex: {
    macros: { },
    rules: [ ]
      .concat(Object.keys(tokens).map(function(token) {
        return [ tokens[token], ( 'return ' + quote(token) ) ] })) },
  operators: [
    [ 'left', 'OR' ],
    [ 'left', 'AND' ],
    [ 'right', 'PLUS', 'WITH' ] ],
  tokens: [ ]
    .concat(Object.keys(tokens))
    .join(' '),
  start: 'start',
  bnf: {
    start: [
      [ 'expression EOS', 'return $$ = $1' ] ],
    char_text: [
      [ 'TEXT' ,''] ],
    char_word: [
      [ 'char_text',''] ],
    char_space: [
      [ 'SPACE',''],
      [ 'TAB',''] ],
    char_break: [
      [ 'NEWLINE',''],
      [ 'RETURN',''] ],
    word: [
      [ 'char_word',''] ] } }

console.log(new Generator(grammar, options).generate())
