import s from 'src/utils/s'

const definition = (strings) => ({
	message0 : s(strings, 'block.blocks.output_key_release.message0'),
	args0    : [
		{
			type  : 'input_value',
			name  : 'KEY',
			check : 'Key'
		},
	],
	previousStatement : null,
	nextStatement     : null,
	category          : 'input',
	colour            : '#f580c5',
	colourSecondary   : '#f75abb',
	colourTertiary    : '#f442b0',
})

export default definition
