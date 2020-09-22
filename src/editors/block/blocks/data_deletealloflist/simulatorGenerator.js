import { sanitizeCPPVariableName } from 'src/utils/string'
import {
	parseNext,
	parseInstaceDefinition,
} from '../../utils/simulatorParsing'

const generator = ({ field, next }, structure) => {
	const name = sanitizeCPPVariableName(`list_${field && field[0]}`)
	if (!name) {
		parseNext(next, structure)
		return
	}
	parseInstaceDefinition(structure, name, 'Vector')

	structure.body += '// Delete all items from list:\n'
	structure.body += `${name}.clear();\n`

	parseNext(next, structure)
}

export default generator
