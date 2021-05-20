const definition = () => ({
	message0 : window.Blockly.Msg.OPERATORS_AND,
	args0    : [
		{
			type  : 'input_value',
			name  : 'OPERAND1',
			check : 'Boolean',
		},
		{
			type  : 'input_value',
			name  : 'OPERAND2',
			check : 'Boolean',
		},
	],
	category   : window.Blockly.Categories.operators,
	extensions : ['colours_operators', 'output_boolean'],
})
export default definition
