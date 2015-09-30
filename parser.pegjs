start = graph

OUT = "\x0E"

IN = "\x0F"

NEWLINE = '\n'

word
  = chars:[a-z]+
    { return chars.join() }

graph
  = properties:property+
    { return properties.reduce(function(result, property) {
        result[property.name] = property.children
        return result }, new Object) }

property
  = name: word NEWLINE IN child:word
    { return {
        name: name,
        children: [ child ] } }
