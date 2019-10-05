import s from 'src/utils/s'

export default (strings) => ({
	message0 : '%1',
	args0    : [
		{
			type    : 'field_dropdown',
			name    : 'VALUE',
			options : [
				[s(strings, 'block.blocks.places.left_eye'), 'LE'],
				[s(strings, 'block.blocks.places.right_eye'), 'RE'],
				[s(strings, 'block.blocks.places.left_mouth'), 'LM'],
				[s(strings, 'block.blocks.places.right_mouth'), 'RM'],
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
	colour          : '#f580c5',
	colourSecondary : '#f75abb',
	colourTertiary  : '#f442b0',
	outputShape     : 2,
})
