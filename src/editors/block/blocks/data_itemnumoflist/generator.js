import {
	parseNext,
	getValueBlockByAttributeName,
	parseInstaceDefinition,
	getBlockBody
} from '../../utils/parsing'

export default ({ value, field, next }, structure) => {
	const valueBlock = getValueBlockByAttributeName(value, 'ITEM')
	if (!valueBlock) {
		parseNext(next, structure)
		return
	}
	const valueBody = getBlockBody(valueBlock, structure)
	const name = field && field[0]

	parseInstaceDefinition(structure, name, 'Vector<float>')

	structure.body += `${name}.position(${valueBody})`

	parseNext(next, structure)
}
