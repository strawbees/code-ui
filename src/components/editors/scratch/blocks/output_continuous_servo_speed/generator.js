import parsing from './../../utils/parsing'

const {
	parseNext,
	getValueBlockByAttributeName,
	computeInstanceName,
	parseInstaceDefinition,
	parseInstacePropertyAssignment,
	setInstacePropertyOneTimeAssignment
} = parsing

export default ({ VALUE, FIELD, NEXT }, structure) => {
	const place = FIELD && FIELD[0]
	const speedBlock = getValueBlockByAttributeName(VALUE, 'SPEED')
	if (!speedBlock) {
		parseNext(NEXT, structure)
		return
	}
	const type = 'ContinuosServo'
	const instance = computeInstanceName(type, place)

	parseInstaceDefinition(structure, instance, type)
	setInstacePropertyOneTimeAssignment(structure, instance, 'place', place)
	parseInstacePropertyAssignment(speedBlock, structure, instance, 'speed')

	parseNext(NEXT, structure)
}
