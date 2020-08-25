import {
	parseNext,
	getBlockBody,
	getValueBlockByAttributeName,
	computeInstanceName,
	parseInstaceDefinition,
	parseInstacePropertyAssignment,
	setInstacePropertyOneTimeAssignment
} from '../../utils/parsing'

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
	setInstacePropertyOneTimeAssignment(structure, instance, 'place', place)
	setInstacePropertyOneTimeAssignment(structure, instance, 'light', '0')
	parseInstacePropertyAssignment(colorBlock, structure, instance, 'color')

	parseNext(next, structure)
}

export default generator
