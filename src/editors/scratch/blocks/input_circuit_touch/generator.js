import {
	parseNext,
	computeInstanceName,
	parseInstaceDefinition,
	parseInstacePropertyRetrieval,
	setInstacePropertyOneTimeAssignment
} from './../../utils/parsing'

export default ({ field, next }, structure) => {
	const place = field && field[0]
	const type = 'CircuitTouch'
	const instance = computeInstanceName(structure, type, place)

	parseInstaceDefinition(structure, instance, type)
	setInstacePropertyOneTimeAssignment(structure, instance, 'place', place)
	parseInstacePropertyRetrieval(structure, instance, 'out')

	parseNext(next, structure)
}
