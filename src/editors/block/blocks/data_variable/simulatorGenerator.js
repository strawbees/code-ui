import { sanitizeCPPVariableName } from 'src/utils/string'
import {
	parseNext,
	parseInstaceDefinition,
} from '../../utils/simulatorParsing'

const generator = ({ field, next }, structure) => {
	const name = sanitizeCPPVariableName(`var_${field && field[0]}`)

	parseInstaceDefinition(structure, name, 'Number')

	structure.body += `${name}/* value of variable */`

	parseNext(next, structure)
}

export default generator
