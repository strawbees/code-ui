import {
	parseNext,
	getValueBlockByAttributeName,
	computeInstanceName,
	parseInstaceDefinition,
	parseInstacePropertyAssignment,
	setInstacePropertyOneTimeAssignment
} from './../../utils/parsing'

export default ({ value, field, next }, structure) => {
	const place = field && field[0]
	const positionBlock = getValueBlockByAttributeName(value, 'POSITION')
	if (!positionBlock) {
		parseNext(next, structure)
		return
	}
	const type = 'ServoMotor'
	const instance = computeInstanceName(structure, type, place)

	parseInstaceDefinition(structure, instance, type)
	setInstacePropertyOneTimeAssignment(structure, instance, 'place', place)
	parseInstacePropertyAssignment(positionBlock, structure, instance, 'position')

	parseNext(next, structure)
}
