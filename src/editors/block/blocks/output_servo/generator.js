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
	const positionBlock = getValueBlockByAttributeName(value, 'POSITION')
	if (!positionBlock) {
		parseNext(next, structure)
		return
	}

	const type = 'ServoMotor'
	const instance = computeInstanceName(structure, type, place)

	parseInstaceDefinition(structure, instance, type)
	structure.body += '// Set servo position:\n'
	setNodeInstacePropertyOneTimeAssignment(structure, instance, 'place', place)
	parseNodeInstacePropertyAssignment(positionBlock, structure, instance, 'position')

	parseNext(next, structure)
}

export default generator
