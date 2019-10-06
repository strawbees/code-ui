import {
	parseNext,
	computeInstanceName,
	getBlockBody,
	getValueBlockByAttributeName,
	parseInstaceDefinition,
	parseInstacePropertyRetrieval,
	setInstacePropertyOneTimeAssignment
} from '../../utils/parsing'

export default ({ value, next }, structure) => {
	const placeBlock = getValueBlockByAttributeName(value, 'PLACE')
	if (!placeBlock) {
		parseNext(next, structure)
		return
	}
	const place = getBlockBody(placeBlock)
	const type = 'LightSensor'
	const instance = computeInstanceName(structure, type, place)

	parseInstaceDefinition(structure, instance, type)
	setInstacePropertyOneTimeAssignment(structure, instance, 'place', place)
	parseInstacePropertyRetrieval(structure, instance, 'out')

	parseNext(next, structure)
}
