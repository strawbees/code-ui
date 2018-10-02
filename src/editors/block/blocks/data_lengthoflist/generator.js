import { sanitizeCPPVariableName } from 'src/utils/string'
import {
	parseNext,
	parseInstaceDefinition,
} from '../../utils/parsing'

export default ({ field, next }, structure) => {
	const name = sanitizeCPPVariableName(field && field[0])
	if (!name) {
		parseNext(next, structure)
		return
	}
	parseInstaceDefinition(structure, name, 'Vector<float>')

	structure.body += `${name}.size()`

	parseNext(next, structure)
}
