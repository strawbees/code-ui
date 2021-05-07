import s from 'src/utils/s'

const definition = (strings) => ({
	message0 : s(strings, 'block.blocks.event_when.message0'),
	args0    : [
		{
			type  : 'input_value',
			name  : 'CONDITION',
			check : 'Boolean',
		},
	],
	inputsInline    : true,
	nextStatement   : null,
	colour          : '#FFBF00',
	colourSecondary : '#E6AC00',
	colourTertiary  : '#CC9900',
})

export default definition
