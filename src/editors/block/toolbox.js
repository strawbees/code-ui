import s from 'src/utils/s'

export default (strings) => ([
	{
		name            : s(strings, 'block.toolbox.category.input'),
		colour          : '#7fd5f0',
		secondaryColour : '#01adee',
		blocks          : [
			{
				type : 'input_circuit_touch_touched'
			},
			{
				type : 'input_circuit_touch'
			},
			{
				type : 'input_light_sensor'
			}
		]
	},
	{
		name            : s(strings, 'block.toolbox.category.output'),
		colour          : '#f580c5',
		secondaryColour : '#f75abb',
		blocks          : [
			{
				type   : 'output_led',
				values : [
					{
						name  : 'LIGHT',
						type  : 'math_positive_number',
						field : 'NUM',
						value : 1
					}
				]
			},
			{
				type   : 'output_led_dual_color_light',
				values : [
					{
						name  : 'LIGHT',
						type  : 'math_positive_number',
						field : 'NUM',
						value : 1
					}
				]
			},
			{
				type   : 'output_led_dual_color_color',
				values : [
					{
						name  : 'COLOR',
						type  : 'math_positive_number',
						field : 'NUM',
						value : 1
					}
				]
			},
			{
				type   : 'output_servo',
				values : [
					{
						name  : 'POSITION',
						type  : 'math_positive_number',
						field : 'NUM',
						value : 1
					}
				]
			},
			{
				type   : 'output_continuous_servo_speed',
				values : [
					{
						name  : 'SPEED',
						type  : 'math_positive_number',
						field : 'NUM',
						value : 1
					}
				]
			},
			{
				type   : 'output_continuous_servo_direction',
				values : [
					{
						name  : 'DIRECTION',
						type  : 'math_positive_number',
						field : 'NUM',
						value : 1
					}
				]
			}
		]
	},
	{
		name            : s(strings, 'block.toolbox.category.control'),
		colour          : '#FFAB19',
		secondaryColour : '#CF8B17',
		blocks          : [
			{
				type   : 'control_wait',
				values : [
					{
						name  : 'DURATION',
						type  : 'math_positive_number',
						field : 'NUM',
						value : 1
					}
				]
			},
			{
				type   : 'control_repeat',
				values : [
					{
						name  : 'TIMES',
						type  : 'math_whole_number',
						field : 'NUM',
						value : 1
					}
				]
			},
			{
				type : 'control_forever',
			},
			{
				type : 'control_if',
			},
			{
				type : 'control_if_else',
			},
			{
				type : 'control_wait_until',
			},
			{
				type : 'control_repeat_until',
			}
		]
	},
	{
		name            : s(strings, 'block.toolbox.category.operators'),
		colour          : '#40BF4A',
		secondaryColour : '#389438',
		blocks          : [
			{
				type   : 'operator_add',
				values : [
					{
						name  : 'NUM1',
						type  : 'math_number',
						field : 'NUM',
						value : ''
					},
					{
						name  : 'NUM2',
						type  : 'math_number',
						field : 'NUM',
						value : ''
					}
				]
			},
			{
				type   : 'operator_subtract',
				values : [
					{
						name  : 'NUM1',
						type  : 'math_number',
						field : 'NUM',
						value : ''
					},
					{
						name  : 'NUM2',
						type  : 'math_number',
						field : 'NUM',
						value : ''
					}
				]
			},
			{
				type   : 'operator_multiply',
				values : [
					{
						name  : 'NUM1',
						type  : 'math_number',
						field : 'NUM',
						value : ''
					},
					{
						name  : 'NUM2',
						type  : 'math_number',
						field : 'NUM',
						value : ''
					}
				]
			},
			{
				type   : 'operator_divide',
				values : [
					{
						name  : 'NUM1',
						type  : 'math_number',
						field : 'NUM',
						value : ''
					},
					{
						name  : 'NUM2',
						type  : 'math_number',
						field : 'NUM',
						value : ''
					}
				]
			},
			{
				type   : 'operator_random',
				values : [
					{
						name  : 'FROM',
						type  : 'math_number',
						field : 'NUM',
						value : ''
					},
					{
						name  : 'TO',
						type  : 'math_number',
						field : 'NUM',
						value : ''
					}
				]
			},
			{
				type   : 'operator_lt',
				values : [
					{
						name  : 'OPERAND1',
						type  : 'math_number',
						field : 'NUM',
						value : ''
					},
					{
						name  : 'OPERAND2',
						type  : 'math_number',
						field : 'NUM',
						value : ''
					}
				]
			},
			{
				type   : 'operator_equals',
				values : [
					{
						name  : 'OPERAND1',
						type  : 'math_number',
						field : 'NUM',
						value : ''
					},
					{
						name  : 'OPERAND2',
						type  : 'math_number',
						field : 'NUM',
						value : ''
					}
				]
			},
			{
				type   : 'operator_gt',
				values : [
					{
						name  : 'OPERAND1',
						type  : 'math_number',
						field : 'NUM',
						value : ''
					},
					{
						name  : 'OPERAND2',
						type  : 'math_number',
						field : 'NUM',
						value : ''
					}
				]
			},
			{
				type : 'operator_and'
			},
			{
				type : 'operator_or'
			},
			{
				type : 'operator_not'
			},
			{
				type   : 'operator_mod',
				values : [
					{
						name  : 'NUM1',
						type  : 'math_number',
						field : 'NUM',
						value : ''
					},
					{
						name  : 'NUM2',
						type  : 'math_number',
						field : 'NUM',
						value : ''
					}
				]
			},
			{
				type   : 'operator_round',
				values : [
					{
						name  : 'NUM',
						type  : 'math_number',
						field : 'NUM',
						value : ''
					}
				]
			},
			{
				type   : 'operator_mathop',
				values : [
					{
						name  : 'NUM',
						type  : 'math_number',
						field : 'NUM',
						value : ''
					}
				]
			}
		]
	},
	{
		name            : s(strings, 'block.toolbox.category.variables'),
		colour          : '#FF8C1A',
		secondaryColour : '#DB6E00',
		custom          : 'VARIABLE'
	},
	{
		name            : s(strings, 'block.toolbox.category.procedures'),
		colour          : '#FF6680',
		secondaryColour : '#FF4D6A',
		custom          : 'PROCEDURE'
	}
])
