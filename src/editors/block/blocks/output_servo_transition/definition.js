import s from 'src/utils/s'

export default (strings) => ({
	message0 : s(strings, 'block.blocks.output_servo_transition.message0'),
	args0    : [
		{
			type    : 'field_dropdown',
			name    : 'PLACE',
			options : [
				[s(strings, 'block.blocks.places.servor_motor_1'), 'SERVO_MOTOR_1'],
				[s(strings, 'block.blocks.places.servor_motor_2'), 'SERVO_MOTOR_2'],
			]
		},
		{
			type  : 'input_value',
			name  : 'POSITION',
			check : 'Number'
		},
		{
			type  : 'input_value',
			name  : 'DURATION',
			check : 'Number'
		},
		{
			type    : 'field_dropdown',
			name    : 'EASING',
			options : [
				[s(strings, 'block.blocks.easing.linear'), '0'],
				[s(strings, 'block.blocks.easing.sine_in'), '1'],
				[s(strings, 'block.blocks.easing.sine_out'), '2'],
				[s(strings, 'block.blocks.easing.sine_in_out'), '3'],
				[s(strings, 'block.blocks.easing.expo_in'), '4'],
				[s(strings, 'block.blocks.easing.expo_out'), '5'],
				[s(strings, 'block.blocks.easing.expo_in_out'), '6'],
			]
		},
	],
	previousStatement : null,
	nextStatement     : null,
	category          : 'input',
	colour            : '#f580c5',
	colourSecondary   : '#f75abb',
	colourTertiary    : '#f442b0',
})
