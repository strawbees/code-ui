const definition = (strings) => ({
	message0 : window.Blockly.Msg.DATA_SETVARIABLETO,
	args0    : [
		{
			type : 'field_variable',
			name : 'VARIABLE',
		},
		{
			type : 'input_value',
			name : 'VALUE',
		}
	],
	category   : window.Blockly.Categories.data,
	extensions : [
		'colours_data',
		'shape_statement'
	],
})

export default definition
