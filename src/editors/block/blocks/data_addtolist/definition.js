import s from 'src/utils/s'

export default () => ({
	message0 : window.Blockly.Msg.DATA_ADDTOLIST,
	args0    : [
		{
			type : 'input_value',
			name : 'ITEM'
		},
		{
			type          : 'field_variable',
			name          : 'LIST',
			variableTypes : ['list']
		}
	],
	category          : 'data-lists',
	previousStatement : null,
	nextStatement     : null,
	colour            : '#FF661A',
	colourSecondary   : '#FF5500',
	colourTertiary    : '#E64D00',
})
