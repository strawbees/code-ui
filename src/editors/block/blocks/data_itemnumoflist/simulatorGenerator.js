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

	structure.body += `(${name}.position(${valueBody}) + 1)/* position of item in list */`

	parseNext(next, structure)
}

export default generator
