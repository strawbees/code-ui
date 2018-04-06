export default (strings) => ({
	'message0': 'set dual color led %1 light to %2',
	'args0': [
		{
			'type': 'field_dropdown',
			'name': 'PLACE',
			'options': [
				['horn', 'H'],
				['left arm', 'LA'],
				['light arm', 'RA'],
				['left leg', 'LL'],
				['right leg', 'RL'],
			]
		},
		{
			'type' : 'input_value',
			'name' : 'LIGHT',
			'check' : 'Number'
		}
	],
	'previousStatement': null,
	'nextStatement': null,
	'category': 'input',
	'colour': '#f580c5',
	'colourSecondary': '#f75abb',
	'colourTertiary': '#f442b0',
})
