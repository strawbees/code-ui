export default (strings) => ({
	message0 : window.Blockly.Msg.DATA_SETVARIABLETO,
	args0    : [
		{
			type : 'field_variable',
			name : 'VARIABLE',
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
