import parsing from './../../utils/parsing'

const {
	parseNext,
	getValueBlockByAttributeName,
	parseInstaceDefinition,
	getBlockBody
} = parsing

export default ({ VALUE, FIELD, NEXT }, structure) => {
	const valueBlock = getValueBlockByAttributeName(VALUE, 'VALUE')
	if (!valueBlock) {
		parseNext(NEXT, structure)
		return
	}
	const value = getBlockBody(valueBlock, structure)
	const name = FIELD && FIELD[0]

	parseInstaceDefinition(structure, name, 'float')

	structure.body += `${name} = ${value};\n`

	parseNext(NEXT, structure)
}
