import {
	parseNext,
	getValueBlockByAttributeName,
	computeInstanceName,
	parseInstaceDefinition,
	parseInstacePropertyAssignment,
	setInstacePropertyOneTimeAssignment
} from '../../utils/parsing'

export default ({ value, field, next }, structure) => {
	const place = field && field[0]
	const directionBlock = getValueBlockByAttributeName(value, 'DIRECTION')
	if (!directionBlock) {
		parseNext(next, structure)
		return
	}
	const type = 'ContinuousServo'
	const instance = computeInstanceName(structure, type, place)

	parseInstaceDefinition(structure, instance, type)
	setInstacePropertyOneTimeAssignment(structure, instance, 'place', place)
	parseInstacePropertyAssignment(directionBlock, structure, instance, 'direction')

	parseNext(next, structure)
}
