import {
	parseNext,
	computeInstanceName,
	parseInstaceDefinition,
	setInstacePropertyOneTimeAssignment
} from '../../utils/parsing'

export default ({ field, next }, structure) => {
	const place = field && field[0]
	const type = 'CircuitTouch'
	const instance = computeInstanceName(structure, type, place)

	parseInstaceDefinition(structure, instance, type)
	setInstacePropertyOneTimeAssignment(structure, instance, 'place', place)
	structure.body += `(${instance}.out.get() == 1.0)`

	parseNext(next, structure)
}
