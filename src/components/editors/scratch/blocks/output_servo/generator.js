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
	const positionBlock = getValueBlockByAttributeName(VALUE, 'POSITION')
	if (!positionBlock) {
		parseNext(NEXT, structure)
		return
	}
	const type = 'Servo'
	const instance = computeInstanceName(type, place)

	parseInstaceDefinition(structure, instance, type)
	setInstacePropertyOneTimeAssignment(structure, instance, 'place', place)
	parseInstacePropertyAssignment(positionBlock, structure, instance, 'position')

	parseNext(NEXT, structure)
}
