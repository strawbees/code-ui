import s from 'src/utils/s'

const definition = (strings) => ({
	message0 : '%1',
	args0    : [
		{
			type    : 'field_dropdown',
			name    : 'VALUE',
			options : [
				[s(strings, 'block.blocks.easing.linear'), 'EASING_LINEAR'],
				[s(strings, 'block.blocks.easing.sine-in'), 'EASING_SINE_IN'],
				[s(strings, 'block.blocks.easing.sine-out'), 'EASING_SINE_OUT'],
				[s(strings, 'block.blocks.easing.sine-in-out'), 'EASING_SINE_IN_OUT'],
				[s(strings, 'block.blocks.easing.quad-in'), 'EASING_QUAD_IN'],
				[s(strings, 'block.blocks.easing.quad-out'), 'EASING_QUAD_OUT'],
				[s(strings, 'block.blocks.easing.quad-in-out'), 'EASING_QUAD_IN_OUT'],
				[s(strings, 'block.blocks.easing.cubic-in'), 'EASING_CUBIC_IN'],
				[s(strings, 'block.blocks.easing.cubic-out'), 'EASING_CUBIC_OUT'],
				[s(strings, 'block.blocks.easing.cubic-in-out'), 'EASING_CUBIC_IN_OUT'],
				[s(strings, 'block.blocks.easing.quart-in'), 'EASING_QUART_IN'],
				[s(strings, 'block.blocks.easing.quart-out'), 'EASING_QUART_OUT'],
				[s(strings, 'block.blocks.easing.quart-in-out'), 'EASING_QUART_IN_OUT'],
				[s(strings, 'block.blocks.easing.quint-in'), 'EASING_QUINT_IN'],
				[s(strings, 'block.blocks.easing.quint-out'), 'EASING_QUINT_OUT'],
				[s(strings, 'block.blocks.easing.quint-in-out'), 'EASING_QUINT_IN_OUT'],
				[s(strings, 'block.blocks.easing.expo-in'), 'EASING_EXPO_IN'],
				[s(strings, 'block.blocks.easing.expo-out'), 'EASING_EXPO_OUT'],
				[s(strings, 'block.blocks.easing.expo-in-out'), 'EASING_EXPO_IN_OUT'],
				[s(strings, 'block.blocks.easing.circ-in'), 'EASING_CIRC_IN'],
				[s(strings, 'block.blocks.easing.circ-out'), 'EASING_CIRC_OUT'],
				[s(strings, 'block.blocks.easing.circ-in-out'), 'EASING_CIRC_IN_OUT'],
				[s(strings, 'block.blocks.easing.back-in'), 'EASING_BACK_IN'],
				[s(strings, 'block.blocks.easing.back-out'), 'EASING_BACK_OUT'],
				[s(strings, 'block.blocks.easing.back-in-out'), 'EASING_BACK_IN_OUT'],
				[s(strings, 'block.blocks.easing.elastic-in'), 'EASING_ELASTIC_IN'],
				[s(strings, 'block.blocks.easing.elastic-out'), 'EASING_ELASTIC_OUT'],
				[s(strings, 'block.blocks.easing.elastic-in-out'), 'EASING_ELASTIC_IN_OUT'],
				[s(strings, 'block.blocks.easing.bounce-in'), 'EASING_BOUNCE_IN'],
				[s(strings, 'block.blocks.easing.bounce-out'), 'EASING_BOUNCE_OUT'],
				[s(strings, 'block.blocks.easing.bounce-in-out'), 'EASING_BOUNCE_IN_OUT'],
			]
		}
	],
	output          : 'Number',
	category        : 'input',
	colour          : '#f580c5',
	colourSecondary : '#f75abb',
	colourTertiary  : '#f442b0',
	outputShape     : window.Blockly.OUTPUT_SHAPE_ROUND,
})

export default definition
