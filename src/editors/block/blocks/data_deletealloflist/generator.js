import { sanitizeCPPVariableName } from 'src/utils/string'
import {
	parseNext,
	parseInstaceDefinition,
} from '../../utils/parsing'

export default ({ field, next }, structure) => {
	const name = sanitizeCPPVariableName(`list_${field && field[0]}`)
	if (!name) {
		parseNext(next, structure)
		return
	}
	parseInstaceDefinition(structure, name, 'Vector<float>')

	structure.body += `while(${name}.size()) {\n`
	structure.body += `${name}.removeAt(0);\n`
	structure.body += '}\n'

	parseNext(next, structure)
}
