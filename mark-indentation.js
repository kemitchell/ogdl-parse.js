module.exports = function markIndentation(string) {
  // Flag set once a line with indentation has been seen.
  var haveSeenIndentation = false
  // Flag set if the first line with indentation uses tabs.
  var usingTabs = false
  // The length of the indentation at the beginning of the previous line.
  var lastIndent = 0
  return string
    .split(LINE_END)
    .map(function(line) {
      var indentationCharacters = INITIAL_SPACE.exec(line)[1]
      var currentIndent = indentationCharacters.length
      var lineWithoutIndentation = line.substring(currentIndent)
      // The current line is indented.
      if (currentIndent > 0) {
        var hasTab = indentationCharacters.indexOf('\t') > -1
        var hasSpace = indentationCharacters.indexOf(' ') > -1
        // Already saw an indented line
        if (haveSeenIndentation) {
          if (( usingTabs && hasSpace ) || ( !usingTabs && hasTab )) {
            throw new Error(MIXED_TABS_AND_SPACES) } }
        else {
          haveSeenIndentation = true
          if (hasTab && hasSpace) {
            throw new Error(MIXED_TABS_AND_SPACES) }
          else if (hasTab) {
            usingTabs = true } } }
      // Same indent
      if (currentIndent === lastIndent) {
        return lineWithoutIndentation }
      // Different indent than previous line
      else {
        var lineWithIndentationMarker =
          ( ( currentIndent > lastIndent ) ?
              ( IN + lineWithoutIndentation ) :
              ( OUT + lineWithoutIndentation ) )
        lastIndent = currentIndent
        return lineWithIndentationMarker } })
    .join('\n') }

var MIXED_TABS_AND_SPACES = 'Cannot mix tab and space indentation'
var IN = require('./markers').IN
var INITIAL_SPACE = /^(\s*)/
var LINE_END = /\n|\r|\r\n/
var OUT = require('./markers').OUT
