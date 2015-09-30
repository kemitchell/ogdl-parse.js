start = graph

OUT = "\x0E"

IN = "\x0F"

NEWLINE = '\n'

word
	= chars:[a-z]+ { return chars.join() }

graph
	=	name:word NEWLINE IN child:word
		{ var result = {}; result[name] = [child]; return result; }
