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
	const type = 'LightSensor'
	const instance = computeInstanceName(structure, type, place)

	parseInstaceDefinition(structure, instance, type)
	setInstacePropertyOneTimeAssignment(structure, instance, 'place', place)
	structure.body += `${instance}.out.get()/* light sensor value */`

	parseNext(next, structure)
}

export default generator
