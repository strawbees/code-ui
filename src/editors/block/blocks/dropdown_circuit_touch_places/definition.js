import s from 'src/utils/s'

export default (strings) => ({
	message0 : '%1',
	args0    : [
		{
			type    : 'field_dropdown',
			name    : 'VALUE',
			options : [
				[s(strings, 'block.blocks.places.horn'), 'H'],
				[s(strings, 'block.blocks.places.left_arm'), 'LA'],
				[s(strings, 'block.blocks.places.right_arm'), 'RA'],
				[s(strings, 'block.blocks.places.left_leg'), 'LL'],
				[s(strings, 'block.blocks.places.right_leg'), 'RL'],
			]
		}
	],
	output          : 'Number',
	category        : 'input',
	colour          : '#7fd5f0',
	colourSecondary : '#76c4e2',
	colourTertiary  : '#01adee',
	outputShape     : 2,
})
