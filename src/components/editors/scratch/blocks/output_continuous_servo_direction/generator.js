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
	const directionBlock = getValueBlockByAttributeName(VALUE, 'DIRECTION')
	if (!directionBlock) {
		parseNext(NEXT, structure)
		return
	}
	const type = 'ContinuosServo'
	const instance = computeInstanceName(type, place)

	parseInstaceDefinition(structure, instance, type)
	setInstacePropertyOneTimeAssignment(structure, instance, 'place', place)
	parseInstacePropertyAssignment(directionBlock, structure, instance, 'direction')

	parseNext(NEXT, structure)
}
