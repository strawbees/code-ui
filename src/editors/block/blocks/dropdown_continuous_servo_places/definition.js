import s from 'src/utils/s'

export default (strings) => ({
	message0 : '%1',
	args0    : [
		{
			type    : 'field_dropdown',
			name    : 'VALUE',
			options : [
				[s(strings, 'block.blocks.places.servor_motor_1'), 'PLACE_SERVO_MOTOR_1'],
				[s(strings, 'block.blocks.places.servor_motor_2'), 'PLACE_SERVO_MOTOR_2'],
			]
		}
	],
	output          : 'Place',
	category        : 'input',
	colour          : '#f580c5',
	colourSecondary : '#f75abb',
	colourTertiary  : '#f442b0',
	outputShape     : window.Blockly.OUTPUT_SHAPE_SQUARE,
})
