import s from 'src/utils/s'

export default (strings) => ({
	message0 : s(strings, 'scratch.blocks.input_light_sensor.message0'),
	args0    : [
		{
			type    : 'field_dropdown',
			name    : 'PLACE',
			options : [
				[s(strings, 'scratch.blocks.places.horn'), 'H'],
				[s(strings, 'scratch.blocks.places.left_arm'), 'LA'],
				[s(strings, 'scratch.blocks.places.right_arm'), 'RA'],
				[s(strings, 'scratch.blocks.places.left_leg'), 'LL'],
				[s(strings, 'scratch.blocks.places.right_leg'), 'RL'],
			]
		}
	],
	output          : 'Number',
	category        : 'input',
	colour          : '#7fd5f0',
	colourSecondary : '#76c4e2',
	colourTertiary  : '#01adee',
	outputShape     : 2
})
