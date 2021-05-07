import { sanitizeCPPVariableName } from 'src/utils/string'
import {
	parseNext,
	getValueBlockByAttributeName,
	parseInstaceDefinition,
	getBlockBody,
} from '../../utils/parsing'

const generator = ({ value, field, next }, structure) => {
	const valueBlock = getValueBlockByAttributeName(value, 'ITEM')
	if (!valueBlock) {
		parseNext(next, structure)
		return
	}
	const valueBody = getBlockBody(valueBlock, structure)
	const name = sanitizeCPPVariableName(`list_${field && field[0]}`)

	parseInstaceDefinition(structure, name, 'Vector<float>')

	structure.body += `${name}.contains(${valueBody})/* does list contains item? */`

	parseNext(next, structure)
}

export default generator
