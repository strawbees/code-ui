import s from 'src/utils/s'

export default (strings) => ({
	message0 : window.Blockly.Msg.DATA_DELETEOFLIST,
	args0    : [
		{
			type : 'input_value',
			name : 'INDEX'
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
