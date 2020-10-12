import {
	parseNext,
	getBlockBody,
	getValueBlockByAttributeName,
	computeInstanceName,
	parseInstaceDefinition,
	parseNodeInstacePropertyAssignment,
	setNodeInstacePropertyOneTimeAssignment
} from '../../utils/simulatorParsing'

const generator = ({ value, next }, structure) => {
	const placeBlock = getValueBlockByAttributeName(value, 'PLACE')
	if (!placeBlock) {
		parseNext(next, structure)
		return
	}
	const place = getBlockBody(placeBlock, structure)
	const directionBlock = getValueBlockByAttributeName(value, 'DIRECTION')
	if (!directionBlock) {
		parseNext(next, structure)
		return
	}
	const type = 'ContinuousServo'
	const instance = computeInstanceName(structure, type, place)

	parseInstaceDefinition(structure, instance, type)
	structure.body += '// Set continuous servo direction:\n'
	setNodeInstacePropertyOneTimeAssignment(structure, instance, 'place', place)
	parseNodeInstacePropertyAssignment(directionBlock, structure, instance, 'direction')

	parseNext(next, structure)
}

export default generator
