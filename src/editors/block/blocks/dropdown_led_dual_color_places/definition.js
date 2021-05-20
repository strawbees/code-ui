import s from 'src/utils/s'

const definition = (strings) => ({
	message0 : '%1',
	args0    : [
		{
			type    : 'field_dropdown',
			name    : 'VALUE',
			options : [
				[s(strings, 'block.blocks.places.horn'), 'PLACE_HORN'],
				[s(strings, 'block.blocks.places.left_arm'), 'PLACE_LEFT_ARM'],
				[s(strings, 'block.blocks.places.right_arm'), 'PLACE_RIGHT_ARM'],
				[s(strings, 'block.blocks.places.left_leg'), 'PLACE_LEFT_LEG'],
				[s(strings, 'block.blocks.places.right_leg'), 'PLACE_RIGHT_LEG'],
			],
		},
	],
	output          : 'Place',
	category        : 'input',
	colour          : '#f580c5',
	colourSecondary : '#f75abb',
	colourTertiary  : '#f442b0',
	outputShape     : window.Blockly.OUTPUT_SHAPE_SQUARE,
})

export default definition
