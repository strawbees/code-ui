import s from 'src/utils/s'

const definition = (strings) => ({
	message0 : s(strings, 'block.blocks.input_circuit_touch_touched.message0'),
	args0    : [
		{
			type  : 'input_value',
			name  : 'PLACE',
			check : 'Place',
		},
	],
	output          : 'Boolean',
	category        : 'input',
	colour          : '#7fd5f0',
	colourSecondary : '#76c4e2',
	colourTertiary  : '#01adee',
	outputShape     : window.Blockly.OUTPUT_SHAPE_HEXAGONAL,
})

export default definition
