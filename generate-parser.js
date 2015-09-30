var Generator = require('jison').Generator

var options = {
  type: 'slr',
  moduleType: 'commonjs',
  moduleName: 'ogdl' }

var quote = function(argument) {
  return '\'' + argument + '\'' }

var tokens = {
  NEWLINE: '\n',
  TAB: '\t',
  SPACE: ' ',
  HTAB: '\h' }

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
      [ 'TEXT' ] ],

    char_word: [
      [ 'char_text' ] ],

    char_space: [
      [ 'SPACE' ],
      [ 'TAB' ] ],

    char_break: [
      [ 'NEWLINE' ],
      [ 'RETURN' ] ],

    char_end: [
      [ ] ],

    word: [
      [ 'char_word'
    ]

// [6]  word     ::= ( char_word - '#' - ' \'' - '"')+ (char_word - ' \'' - '"')*
// [7]  string   ::= (char_text | char_space)+
// [8]  break    ::= 10 | 13 | (13 10)
// [9]  comment  ::= '#' string? break
// [10] quoted   ::= '\''  string '\'' | '"' string '"'
// [11] space    ::= char_space+
// [12] space(n) ::= char_space*n ; where n is the equivalent number of spaces.
// [13] block(n) ::= '\' break (space(>n) string? break)+

// [14] element  ::= (word | quoted | group)
// [15] sequence ::= element ( (space? ',')?  space? element )*
// [16] group    ::= '(' space? sequence?  space? ')'
// [17] line(n)  ::= space(n) sequence (space block(n))? break  
// [18] graph    ::= line* char_end

// Note on [15]: A comma is mandatory after a group if there are more elements
// Note on [17]: A block cannot be placed after a group  

// [19] arc ::= "#=" relative_path space? break
// [20] relative_path ::= '.'* ogdl_path

        } }

console.log(new Generator(grammar, options).generate())
