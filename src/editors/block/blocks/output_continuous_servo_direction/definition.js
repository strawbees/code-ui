import s from 'src/utils/s'

export default (strings) => ({
	message0 : s(strings, 'block.blocks.output_continuous_servo_direction.message0'),
	args0    : [
		{
			type  : 'input_value',
			name  : 'PLACE',
			check : 'Number'
		},
		{
			type  : 'input_value',
			name  : 'DIRECTION',
			check : 'Number'
		},
	],
	previousStatement : null,
	nextStatement     : null,
	category          : 'input',
	colour            : '#f580c5',
	colourSecondary   : '#f75abb',
	colourTertiary    : '#f442b0',
})
