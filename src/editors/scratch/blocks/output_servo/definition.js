export default (strings) => ({
	'message0': 'set servo %1 position to %2',
	'args0': [
		{
			'type': 'field_dropdown',
			'name': 'PLACE',
			'options': [
				['1', 'SERVO_MOTOR_1'],
				['2', 'SERVO_MOTOR_2']
			]
		},
		{
			'type' : 'input_value',
			'name' : 'POSITION',
			'check' : 'Number'
		},
	],
	'previousStatement': null,
	'nextStatement': null,
	'category': 'input',
	'colour': '#f580c5',
	'colourSecondary': '#f75abb',
	'colourTertiary': '#f442b0',
})
