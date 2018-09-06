import { sanitizeCPPVariableName } from 'src/utils/string'
import {
	parseNext,
	getValueBlockByAttributeName,
	parseInstaceDefinition,
	getBlockBody
} from '../../utils/parsing'

export default ({ value, field, next }, structure) => {
	const itemBlock = getValueBlockByAttributeName(value, 'ITEM')
	if (!itemBlock) {
		parseNext(next, structure)
		return
	}
	const itemBody = getBlockBody(itemBlock, structure)

	const indexBlock = getValueBlockByAttributeName(value, 'INDEX')
	if (!indexBlock) {
		parseNext(next, structure)
		return
	}
	const indexBody = getBlockBody(indexBlock, structure)

	const name = sanitizeCPPVariableName(field && field[0])

	parseInstaceDefinition(structure, name, 'Vector<float>')

	structure.body += `${name}.addAt(${indexBody} - 1, ${itemBody});\n`

	parseNext(next, structure)
}
