const definition = () => ({
	message0 : window.Blockly.Msg.OPERATORS_GT,
	args0    : [
		{
			type  : 'input_value',
			name  : 'OPERAND1',
			check : 'Number'
		},
		{
			type  : 'input_value',
			name  : 'OPERAND2',
			check : 'Number'
		}
	],
	category   : window.Blockly.Categories.operators,
	extensions : ['colours_operators', 'output_boolean']
})
export default definition
