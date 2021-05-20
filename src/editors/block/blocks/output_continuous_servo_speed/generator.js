import {
	parseNext,
	getBlockBody,
	getValueBlockByAttributeName,
	computeInstanceName,
	parseInstaceDefinition,
	parseNodeInstacePropertyAssignment,
	setNodeInstacePropertyOneTimeAssignment,
} from '../../utils/parsing'

const generator = ({ value, next }, structure) => {
	const placeBlock = getValueBlockByAttributeName(value, 'PLACE')
	if (!placeBlock) {
		parseNext(next, structure)
		return
	}
	const place = getBlockBody(placeBlock, structure)
	const speedBlock = getValueBlockByAttributeName(value, 'SPEED')
	if (!speedBlock) {
		parseNext(next, structure)
		return
	}
	const type = 'ContinuousServo'
	const instance = computeInstanceName(structure, type, place)

	parseInstaceDefinition(structure, instance, type)
	structure.body += '// Set continuous servo speed:\n'
	setNodeInstacePropertyOneTimeAssignment(structure, instance, 'place', place)
	parseNodeInstacePropertyAssignment(speedBlock, structure, instance, 'speed')

	parseNext(next, structure)
}

export default generator
