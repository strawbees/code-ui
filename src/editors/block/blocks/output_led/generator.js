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
	const lightBlock = getValueBlockByAttributeName(value, 'LIGHT')
	if (!lightBlock) {
		parseNext(next, structure)
		return
	}
	const type = 'Led'
	const instance = computeInstanceName(structure, type, place)

	parseInstaceDefinition(structure, instance, type)
	setInstacePropertyOneTimeAssignment(structure, instance, 'place', place)
	parseInstacePropertyAssignment(lightBlock, structure, instance, 'light')

	parseNext(next, structure)
}
