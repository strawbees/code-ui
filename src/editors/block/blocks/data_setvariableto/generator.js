import { sanitizeCPPVariableName } from 'src/utils/string'
import {
	parseNext,
	getValueBlockByAttributeName,
	parseInstaceDefinition,
	getBlockBody
} from '../../utils/parsing'

const generator = ({ value, field, next }, structure) => {
	const valueBlock = getValueBlockByAttributeName(value, 'VALUE')
	if (!valueBlock) {
		parseNext(next, structure)
		return
	}
	const valueBody = getBlockBody(valueBlock, structure)
	const name = sanitizeCPPVariableName(`var_${field && field[0]}`)

	parseInstaceDefinition(structure, name, 'float')

	structure.body += '// Set variable value:\n'
	structure.body += `${name} = ${valueBody};\n`

	parseNext(next, structure)
}

export default generator
