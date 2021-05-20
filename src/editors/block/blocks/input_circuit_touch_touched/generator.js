import {
	parseNext,
	computeInstanceName,
	getBlockBody,
	getValueBlockByAttributeName,
	parseInstaceDefinition,
	setNodeInstacePropertyOneTimeAssignment,
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
	setNodeInstacePropertyOneTimeAssignment(structure, instance, 'place', place)
	structure.body += `(${instance}.out.get() == 1.0)/* circuit touch touched */`

	parseNext(next, structure)
}

export default generator
