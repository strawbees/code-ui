export default (strings) => ({
	message0 : 'change %1 by %2',
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
