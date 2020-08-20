import s from 'src/utils/s'

const toolbox = (strings) => ([
	{
		id              : 'input',
		name            : s(strings, 'block.toolbox.category.input'),
		colour          : '#7fd5f0',
		secondaryColour : '#01adee',
		blocks          : [
			{
				type   : 'input_circuit_touch_touched',
				values : [
					{
						name  : 'PLACE',
						type  : 'dropdown_circuit_touch_places',
						field : 'VALUE',
						value : 'PLACE_HORN'
					},
				],
			},
			{
				type   : 'input_circuit_touch',
				values : [
					{
						name  : 'PLACE',
						type  : 'dropdown_circuit_touch_places',
						field : 'VALUE',
						value : 'PLACE_HORN'
					},
				],
			},
			{
				type   : 'input_light_sensor',
				values : [
					{
						name  : 'PLACE',
						type  : 'dropdown_light_sensor_places',
						field : 'VALUE',
						value : 'PLACE_HORN'
					},
				],
			}
		]
	},
	{
		id              : 'output',
		name            : s(strings, 'block.toolbox.category.output'),
		colour          : '#f580c5',
		secondaryColour : '#f75abb',
		blocks          : [
			{
				type   : 'output_servo',
				values : [
					{
						name  : 'PLACE',
						type  : 'dropdown_servo_places',
						field : 'VALUE',
						value : 'PLACE_SERVO_MOTOR_1'
					},
					{
						name  : 'POSITION',
						type  : 'math_positive_number',
						field : 'NUM',
						value : 1
					}
				]
			},
			{
				type   : 'output_servo_transition',
				values : [
					{
						name  : 'PLACE',
						type  : 'dropdown_servo_places',
						field : 'VALUE',
						value : 'PLACE_SERVO_MOTOR_1'
					},
					{
						name  : 'POSITION',
						type  : 'math_positive_number',
						field : 'NUM',
						value : 1
					},
					{
						name  : 'DURATION',
						type  : 'math_positive_number',
						field : 'NUM',
						value : 2
					},
					{
						name  : 'EASING',
						type  : 'dropdown_easing_functions',
						field : 'VALUE',
						value : 'EASING_LINEAR'
					},
				]
			},
			{
				type   : 'output_continuous_servo_speed',
				values : [
					{
						name  : 'PLACE',
						type  : 'dropdown_continuous_servo_places',
						field : 'VALUE',
						value : 'PLACE_SERVO_MOTOR_1'
					},
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
						name  : 'PLACE',
						type  : 'dropdown_continuous_servo_places',
						field : 'VALUE',
						value : 'PLACE_SERVO_MOTOR_1'
					},
					{
						name  : 'DIRECTION',
						type  : 'dropdown_continuous_servo_directions',
						field : 'VALUE',
						value : 'DIRECTION_CLOCKWISE'
					}
				]
			},
			{
				type   : 'output_led',
				values : [
					{
						name  : 'PLACE',
						type  : 'dropdown_led_places',
						field : 'VALUE',
						value : 'PLACE_LEFT_EYE'
					},
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
						name  : 'PLACE',
						type  : 'dropdown_led_dual_color_places',
						field : 'VALUE',
						value : 'PLACE_HORN'
					},
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
						name  : 'PLACE',
						type  : 'dropdown_led_dual_color_places',
						field : 'VALUE',
						value : 'PLACE_HORN'
					},
					{
						name  : 'COLOR',
						type  : 'math_positive_number',
						field : 'NUM',
						value : 1
					}
				]
			},
			{
				type   : 'output_key_tap',
				values : [
					{
						name  : 'KEY',
						type  : 'dropdown_key_keys',
						field : 'VALUE',
						value : 'KEY_SPACE'
					},
				]
			},
			{
				type   : 'output_key_press',
				values : [
					{
						name  : 'KEY',
						type  : 'dropdown_key_keys',
						field : 'VALUE',
						value : 'KEY_SPACE'
					},
				]
			},
			{
				type   : 'output_key_release',
				values : [
					{
						name  : 'KEY',
						type  : 'dropdown_key_keys',
						field : 'VALUE',
						value : 'KEY_SPACE'
					},
				]
			},
			{
				type   : 'output_key_hold',
				values : [
					{
						name  : 'KEY',
						type  : 'dropdown_key_keys',
						field : 'VALUE',
						value : 'KEY_SPACE'
					},
					{
						name  : 'DURATION',
						type  : 'math_positive_number',
						field : 'NUM',
						value : 2
					},
				]
			},
		]
	},
	{
		id              : 'control',
		name            : window.Blockly.Msg.CATEGORY_CONTROL,
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
		id              : 'operators',
		name            : window.Blockly.Msg.CATEGORY_OPERATORS,
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
		id              : 'variables',
		name            : window.Blockly.Msg.CATEGORY_VARIABLES,
		colour          : '#FF8C1A',
		secondaryColour : '#DB6E00',
		custom          : 'VARIABLE'
	},
	{
		id              : 'myBlocks',
		name            : window.Blockly.Msg.CATEGORY_MYBLOCKS,
		colour          : '#FF6680',
		secondaryColour : '#FF4D6A',
		custom          : 'PROCEDURE'
	}
])

export default toolbox
