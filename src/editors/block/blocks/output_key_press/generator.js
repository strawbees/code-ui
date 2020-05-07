import {
	parseNext,
	getBlockBody,
	getValueBlockByAttributeName,
	computeInstanceName,
	parseInstaceDefinition,
	setInstacePropertyOneTimeAssignment,
	parseInstacePropertyAssignmentFromValue,
} from '../../utils/parsing'

export default ({ value, next }, structure) => {
	const keyBlock = getValueBlockByAttributeName(value, 'KEY')
	if (!keyBlock) {
		parseNext(next, structure)
		return
	}
	const key = getBlockBody(keyBlock, structure)

	const type = 'KeyPress'
	const instance = computeInstanceName(structure, type, key)

	parseInstaceDefinition(structure, instance, type)

	setInstacePropertyOneTimeAssignment(structure, instance, 'key', key)

	parseInstacePropertyAssignmentFromValue(structure, instance, 'trigger', 1)

	parseNext(next, structure)
}
