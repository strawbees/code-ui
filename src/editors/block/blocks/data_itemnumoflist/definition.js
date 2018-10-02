import s from 'src/utils/s'

export default (strings) => ({
	message0 : s(strings, 'block.blocks.data_itemnumoflist.message0'),
	args0    : [
		{
			type : 'input_value',
			name : 'ITEM'
		},
		{
			type          : 'field_variable',
			name          : 'LIST',
			variableTypes : ['list']
		},
	],
	category        : 'data-lists',
	output          : 'Number',
	colour          : '#FF661A',
	colourSecondary : '#FF5500',
	colourTertiary  : '#E64D00',
	outputShape     : 2,
})
