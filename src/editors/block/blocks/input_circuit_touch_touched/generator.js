import {
	parseNext,
	computeInstanceName,
	getBlockBody,
	getValueBlockByAttributeName,
	parseInstaceDefinition,
	setInstacePropertyOneTimeAssignment
} from '../../utils/parsing'

const generator = ({ value, next }, structure) => {
	const placeBlock = getValueBlockByAttributeName(value, 'PLACE')
	if (!placeBlock) {
		parseNext(next, structure)
		return
	}
	const place = getBlockBody(placeBlock, structure)
	const type = 'CircuitTouch'
	const instance = computeInstanceName(structure, type, place)

	parseInstaceDefinition(structure, instance, type)
	setInstacePropertyOneTimeAssignment(structure, instance, 'place', place)
	structure.body += `/* circuit touch touched */ (${instance}.out.get() == 1.0)`

	parseNext(next, structure)
}

export default generator
