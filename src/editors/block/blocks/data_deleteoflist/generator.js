import {
	parseNext,
	getValueBlockByAttributeName,
	parseInstaceDefinition,
	getBlockBody
} from '../../utils/parsing'

export default ({ value, field, next }, structure) => {
	const valueBlock = getValueBlockByAttributeName(value, 'INDEX')
	if (!valueBlock) {
		parseNext(next, structure)
		return
	}
	const valueBody = getBlockBody(valueBlock, structure)
	const name = field && field[0]

	parseInstaceDefinition(structure, name, 'Vector<float>')

	structure.body += `${name}.removeAt(${valueBody});\n`

	parseNext(next, structure)
}
