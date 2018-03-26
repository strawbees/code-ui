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
	const lightBlock = getValueBlockByAttributeName(VALUE, 'LIGHT')
	if (!lightBlock) {
		parseNext(NEXT, structure)
		return
	}
	const type = 'Led'
	const instance = computeInstanceName(type, place)

	parseInstaceDefinition(structure, instance, type)
	setInstacePropertyOneTimeAssignment(structure, instance, 'place', place)
	parseInstacePropertyAssignment(lightBlock, structure, instance, 'light')

	parseNext(NEXT, structure)
}
