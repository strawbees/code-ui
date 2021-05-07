import s from 'src/utils/s'

const definition = (strings) => ({
	message0 : window.Blockly.Msg.DATA_LENGTHOFLIST,
	args0    : [
		{
			type          : 'field_variable',
			name          : 'LIST',
			variableTypes : ['list'],
		},
	],
	category        : 'data-lists',
	output          : 'Number',
	colour          : '#FF661A',
	colourSecondary : '#FF5500',
	colourTertiary  : '#E64D00',
	outputShape     : window.Blockly.OUTPUT_SHAPE_ROUND,
})

export default definition
