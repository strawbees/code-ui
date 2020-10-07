import {
	parseNext,
	getBlockBody,
	getValueBlockByAttributeName,
	computeInstanceName,
	parseInstaceDefinition,
	setNodeInstacePropertyOneTimeAssignment,
	parseNodeInstacePropertyAssignmentFromValue,
} from '../../utils/simulatorParsing'

const generator = ({ value, next }, structure) => {
	const keyBlock = getValueBlockByAttributeName(value, 'KEY')
	if (!keyBlock) {
		parseNext(next, structure)
		return
	}
	const key = getBlockBody(keyBlock, structure)

	const type = 'KeyPress'
	const instance = computeInstanceName(structure, type, key)

	parseInstaceDefinition(structure, instance, type)

	setNodeInstacePropertyOneTimeAssignment(structure, instance, 'key', key)

	structure.body += '// Release a key:\n'
	parseNodeInstacePropertyAssignmentFromValue(structure, instance, 'trigger', 0)

	parseNext(next, structure)
}

export default generator
