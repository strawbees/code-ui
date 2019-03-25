import s from 'src/utils/s'

export default (strings) => ({
	message0 : s(strings, 'block.blocks.output_continuous_servo_speed.message0'),
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
			name  : 'SPEED',
			check : 'Number'
		}
	],
	previousStatement : null,
	nextStatement     : null,
	category          : 'input',
	colour            : '#f580c5',
	colourSecondary   : '#f75abb',
	colourTertiary    : '#f442b0'
})
