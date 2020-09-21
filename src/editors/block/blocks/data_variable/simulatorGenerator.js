import { sanitizeCPPVariableName } from 'src/utils/string'
import {
	parseNext,
	parseInstaceDefinition
} from '../../utils/simulatorParsing'

const generator = ({ field, next }, structure) => {
	const name = sanitizeCPPVariableName(`var_${field && field[0]}`)

	parseInstaceDefinition(structure, name, 'float')

	structure.body += `/* value of variable */ ${name}`

	parseNext(next, structure)
}

export default generator
