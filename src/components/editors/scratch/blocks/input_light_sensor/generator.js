import parsing from './../../utils/parsing'

const {
	parseNext,
	computeInstanceName,
	parseInstaceDefinition,
	parseInstacePropertyRetrieval,
	setInstacePropertyOneTimeAssignment
} = parsing

export default ({ FIELD, NEXT }, structure) => {
	const place = FIELD && FIELD[0]
	const type = 'LightSensor'
	const instance = computeInstanceName(type, place)

	parseInstaceDefinition(structure, instance, type)
	setInstacePropertyOneTimeAssignment(structure, instance, 'place', place)
	parseInstacePropertyRetrieval(structure, instance, 'out')

	parseNext(NEXT, structure)
}
