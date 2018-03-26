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
	const colorBlock = getValueBlockByAttributeName(VALUE, 'COLOR')
	if (!colorBlock) {
		parseNext(NEXT, structure)
		return
	}
	const type = 'DualColorLed'
	const instance = computeInstanceName(type, place)

	parseInstaceDefinition(structure, instance, type)
	setInstacePropertyOneTimeAssignment(structure, instance, 'place', place)
	parseInstacePropertyAssignment(colorBlock, structure, instance, 'color')

	parseNext(NEXT, structure)
}
