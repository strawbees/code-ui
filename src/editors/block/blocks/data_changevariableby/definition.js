const definition = (strings) => ({
	message0 : window.Blockly.Msg.DATA_CHANGEVARIABLEBY,
	args0    : [
		{
			type : 'field_variable',
			name : 'VARIABLE',
			// variableType : 'Number'
		},
		{
			type : 'input_value',
			name : 'VALUE'
		}
	],
	category          : 'data',
	previousStatement : null,
	nextStatement     : null,
	colour            : '#FF8C1A',
	colourSecondary   : '#FF8000',
	colourTertiary    : '#DB6E00',
})

export default definition
