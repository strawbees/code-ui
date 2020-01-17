import s from 'src/utils/s'

export default (strings) => ({
	message0 : '%1',
	args0    : [
		{
			type    : 'field_dropdown',
			name    : 'VALUE',
			options : [
				[s(strings, 'block.blocks.direction.clockwise'), 'DIRECTION_CLOCKWISE'],
				[s(strings, 'block.blocks.direction.counter_clockwise'), 'DIRECTION_COUNTER_CLOCKWISE'],
			]
		}
	],
	output          : 'Number',
	category        : 'input',
	colour          : '#f580c5',
	colourSecondary : '#f75abb',
	colourTertiary  : '#f442b0',
	outputShape     : window.Blockly.OUTPUT_SHAPE_ROUND,
})
