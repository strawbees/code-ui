import {
	parseNext,
	getBlockBody,
	getValueBlockByAttributeName,
	computeInstanceName,
	parseInstaceDefinition,
	setNodeInstacePropertyOneTimeAssignment,
	parseNodeInstacePropertyAssignmentFromValue,
} from '../../utils/parsing'

const generator = ({ value, next }, structure) => {
	const keyBlock = getValueBlockByAttributeName(value, 'KEY')
	if (!keyBlock) {
		parseNext(next, structure)
		return
	}
	const key = getBlockBody(keyBlock, structure)

	const durationBlock = getValueBlockByAttributeName(value, 'DURATION')
	if (!durationBlock) {
		parseNext(next, structure)
		return
	}

	const type = 'KeyPress'
	const instance = computeInstanceName(structure, type, key)

	parseInstaceDefinition(structure, instance, type)

	setNodeInstacePropertyOneTimeAssignment(structure, instance, 'key', key)

	structure.body += '// Hold a key down, for a specific amount of time:\n'
	parseNodeInstacePropertyAssignmentFromValue(structure, instance, 'trigger', 1)
	structure.body += `wait(${getBlockBody(durationBlock, structure)});\n`
	parseNodeInstacePropertyAssignmentFromValue(structure, instance, 'trigger', 0)

	parseNext(next, structure)
}

export default generator
