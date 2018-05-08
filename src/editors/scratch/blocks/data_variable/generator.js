import {
	parseNext,
	parseInstaceDefinition
} from './../../utils/parsing'

export default ({ field, next }, structure) => {
	const name = field && field[0]

	parseInstaceDefinition(structure, name, 'float')

	structure.body += `${name}`

	parseNext(next, structure)
}
