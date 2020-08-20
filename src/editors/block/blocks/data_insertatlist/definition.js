import s from 'src/utils/s'

const definition = (strings) => ({
	message0 : Blockly.Msg.DATA_INSERTATLIST,
	args0    : [
		{
			type : 'input_value',
			name : 'ITEM'
		},
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

export default definition
