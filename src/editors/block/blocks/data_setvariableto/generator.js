import {
	parseNext,
	getValueBlockByAttributeName,
	parseInstaceDefinition,
	getBlockBody
} from './../../utils/parsing'

export default ({ value, field, next }, structure) => {
	const valueBlock = getValueBlockByAttributeName(value, 'VALUE')
	if (!valueBlock) {
		parseNext(next, structure)
		return
	}
	const valueBody = getBlockBody(valueBlock, structure)
	const name = field && field[0]

	parseInstaceDefinition(structure, name, 'float')

	structure.body += `${name} = ${valueBody};\n`

	parseNext(next, structure)
}
