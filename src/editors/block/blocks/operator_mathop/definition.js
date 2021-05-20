const definition = () => ({
	message0 : window.Blockly.Msg.OPERATORS_MATHOP,
	args0    : [
		{
			type    : 'field_dropdown',
			name    : 'OPERATOR',
			options : [
				[window.Blockly.Msg.OPERATORS_MATHOP_ABS, 'abs'],
				[window.Blockly.Msg.OPERATORS_MATHOP_FLOOR, 'floor'],
				[window.Blockly.Msg.OPERATORS_MATHOP_CEILING, 'ceiling'],
				[window.Blockly.Msg.OPERATORS_MATHOP_SQRT, 'sqrt'],
				[window.Blockly.Msg.OPERATORS_MATHOP_SIN, 'sin'],
				[window.Blockly.Msg.OPERATORS_MATHOP_COS, 'cos'],
				[window.Blockly.Msg.OPERATORS_MATHOP_TAN, 'tan'],
				[window.Blockly.Msg.OPERATORS_MATHOP_ASIN, 'asin'],
				[window.Blockly.Msg.OPERATORS_MATHOP_ACOS, 'acos'],
				[window.Blockly.Msg.OPERATORS_MATHOP_ATAN, 'atan'],
				[window.Blockly.Msg.OPERATORS_MATHOP_LN, 'ln'],
				[window.Blockly.Msg.OPERATORS_MATHOP_LOG, 'log'],
				[window.Blockly.Msg.OPERATORS_MATHOP_EEXP, 'e ^'],
				[window.Blockly.Msg.OPERATORS_MATHOP_10EXP, '10 ^'],
			],
		},
		{
			type  : 'input_value',
			name  : 'NUM',
			check : 'Number',
		},
	],
	category   : window.Blockly.Categories.operators,
	extensions : ['colours_operators', 'output_number'],
})
export default definition
