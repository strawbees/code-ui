import s from 'src/selectors/selectString'

export default (state) => ({
	message0 : s('scratch.blocks.input_light_sensor.message0', state),
	args0    : [
		{
			type    : 'field_dropdown',
			name    : 'PLACE',
			options : [
				[s('scratch.blocks.places.horn', state), 'H'],
				[s('scratch.blocks.places.left_arm', state), 'LA'],
				[s('scratch.blocks.places.right_arm', state), 'RA'],
				[s('scratch.blocks.places.left_leg', state), 'LL'],
				[s('scratch.blocks.places.right_leg', state), 'RL'],
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
