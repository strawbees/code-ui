import s from 'src/utils/s'

export default (strings) => ({
	message0 : s(strings, 'block.blocks.data_listcontainsitem.message0'),
	args0    : [
		{
			type          : 'field_variable',
			name          : 'LIST',
			variableTypes : ['list']
		},
		{
			type : 'input_value',
			name : 'ITEM'
		},
	],
	category        : 'data-lists',
	output          : 'Boolean',
	colour          : '#FF661A',
	colourSecondary : '#FF5500',
	colourTertiary  : '#E64D00',
	outputShape     : 1,
})
