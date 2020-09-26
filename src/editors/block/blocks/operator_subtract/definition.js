const definition = () => ({
	message0 : window.Blockly.Msg.OPERATORS_SUBTRACT,
	args0    : [
		{
			type  : 'input_value',
			name  : 'NUM1',
			check : 'Number'
		},
		{
			type  : 'input_value',
			name  : 'NUM2',
			check : 'Number'
		}
	],
	category   : window.Blockly.Categories.operators,
	extensions : ['colours_operators', 'output_number']
})
export default definition
