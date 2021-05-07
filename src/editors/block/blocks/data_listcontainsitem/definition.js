import s from 'src/utils/s'

const definition = (strings) => ({
	message0 : window.Blockly.Msg.DATA_LISTCONTAINSITEM,
	args0    : [
		{
			type          : 'field_variable',
			name          : 'LIST',
			variableTypes : ['list'],
		},
		{
			type : 'input_value',
			name : 'ITEM',
		},
	],
	category        : 'data-lists',
	output          : 'Boolean',
	colour          : '#FF661A',
	colourSecondary : '#FF5500',
	colourTertiary  : '#E64D00',
	outputShape     : window.Blockly.OUTPUT_SHAPE_HEXAGONAL,
})

export default definition
