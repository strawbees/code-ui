import { sanitizeCPPVariableName } from 'src/utils/string'
import {
	parseNext,
	getValueBlockByAttributeName,
	parseInstaceDefinition,
	getBlockBody,
} from '../../utils/simulatorParsing'

const generator = ({ value, field, next }, structure) => {
	const valueBlock = getValueBlockByAttributeName(value, 'ITEM')
	if (!valueBlock) {
		parseNext(next, structure)
		return
	}
	const valueBody = getBlockBody(valueBlock, structure)
	const name = sanitizeCPPVariableName(`list_${field && field[0]}`)

	parseInstaceDefinition(structure, name, 'Vector')

	structure.body += '// Add one item at the end of list:\n'
	structure.body += `${name}.add(${valueBody});\n`

	parseNext(next, structure)
}

export default generator
