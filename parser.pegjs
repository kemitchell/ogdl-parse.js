char_text
	= TEXT

char_word
	= char_text

char_space
	= ' '
	/ '\t'

char_break
	= '\n'
	/ '\r'

char_end
	=

word
	= (char_word ! '#' ! ' \'')+ (char_word ! ' \'' ! '"')*

string
	= ( char_text / char_space )+

break
	= '\n'
	/ '\r'
	/ '\r\n'

quoted
	= '\'' string '\''
	/ '"' string '"'

space
	= char_space+

space1
	= '    '

block
	= '\\' break(space(>n)
