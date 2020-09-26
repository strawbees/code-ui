const definition = () => ({
	message0 : window.Blockly.Msg.OPERATORS_RANDOM,
	args0    : [
		{
			type  : 'input_value',
			name  : 'FROM',
			check : 'Number',
		},
		{
			type  : 'input_value',
			name  : 'TO',
			check : 'Number',
		}
	],
	category   : window.Blockly.Categories.operators,
	extensions : ['colours_operators', 'output_number']
})
export default definition
