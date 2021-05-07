import {
	parseNext,
	getBlockBody,
	getValueBlockByAttributeName,
	computeInstanceName,
	parseInstaceDefinition,
	parseNodeInstacePropertyAssignment,
	setNodeInstacePropertyOneTimeAssignment,
} from '../../utils/simulatorParsing'

const generator = ({ value, next }, structure) => {
	const placeBlock = getValueBlockByAttributeName(value, 'PLACE')
	if (!placeBlock) {
		parseNext(next, structure)
		return
	}
	const place = getBlockBody(placeBlock, structure)
	const colorBlock = getValueBlockByAttributeName(value, 'COLOR')
	if (!colorBlock) {
		parseNext(next, structure)
		return
	}
	const type = 'DualColorLed'
	const instance = computeInstanceName(structure, type, place)

	parseInstaceDefinition(structure, instance, type)
	setNodeInstacePropertyOneTimeAssignment(structure, instance, 'place', place)
	setNodeInstacePropertyOneTimeAssignment(structure, instance, 'light', '0')
	structure.body += '// Set dual color LED color:\n'
	parseNodeInstacePropertyAssignment(colorBlock, structure, instance, 'color')

	parseNext(next, structure)
}

export default generator
