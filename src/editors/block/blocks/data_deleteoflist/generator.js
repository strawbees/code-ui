import { sanitizeCPPVariableName } from 'src/utils/string'
import {
	parseNext,
	getValueBlockByAttributeName,
	parseInstaceDefinition,
	getBlockBody,
} from '../../utils/parsing'

const generator = ({ value, field, next }, structure) => {
	const valueBlock = getValueBlockByAttributeName(value, 'INDEX')
	if (!valueBlock) {
		parseNext(next, structure)
		return
	}
	const valueBody = getBlockBody(valueBlock, structure)
	const name = sanitizeCPPVariableName(`list_${field && field[0]}`)

	parseInstaceDefinition(structure, name, 'Vector<float>')

	structure.body += '// Delete an item from a specific position of list:\n'
	structure.body += `${name}.removeAt(${valueBody} - 1);\n`

	parseNext(next, structure)
}

export default generator
