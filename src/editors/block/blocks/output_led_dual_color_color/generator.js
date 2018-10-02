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
	const colorBlock = getValueBlockByAttributeName(value, 'COLOR')
	if (!colorBlock) {
		parseNext(next, structure)
		return
	}
	const type = 'DualColorLed'
	const instance = computeInstanceName(structure, type, place)

	parseInstaceDefinition(structure, instance, type)
	setInstacePropertyOneTimeAssignment(structure, instance, 'place', place)
	parseInstacePropertyAssignment(colorBlock, structure, instance, 'color')

	parseNext(next, structure)
}
