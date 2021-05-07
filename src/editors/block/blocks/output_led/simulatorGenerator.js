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
	const lightBlock = getValueBlockByAttributeName(value, 'LIGHT')
	if (!lightBlock) {
		parseNext(next, structure)
		return
	}
	const type = 'Led'
	const instance = computeInstanceName(structure, type, place)

	parseInstaceDefinition(structure, instance, type)
	setNodeInstacePropertyOneTimeAssignment(structure, instance, 'place', place)
	setNodeInstacePropertyOneTimeAssignment(structure, instance, 'light', '0')
	structure.body += '// Set LED light intensity:\n'
	parseNodeInstacePropertyAssignment(lightBlock, structure, instance, 'light')

	parseNext(next, structure)
}

export default generator
