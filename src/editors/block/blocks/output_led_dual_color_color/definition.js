import s from 'src/utils/s'

const definition = (strings) => ({
	message0 : s(strings, 'block.blocks.output_led_dual_color_color.message0'),
	args0    : [
		{
			type  : 'input_value',
			name  : 'PLACE',
			check : 'Place',
		},
		{
			type  : 'input_value',
			name  : 'COLOR',
			check : 'Number',
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
