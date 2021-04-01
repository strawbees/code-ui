import {
	parseNext,
	getValueBlockByAttributeName,
	computeInstanceName,
	parseInstaceDefinition,
	getBlockBody
} from '../../utils/parsing'

const generator = ({
	attributes,
	value,
	next,
	statement
}, structure) => {
	const timesBlock = getValueBlockByAttributeName(value, 'TIMES')
	if (!timesBlock) {
		parseNext(next, structure)
		return
	}
	const times = getBlockBody(timesBlock, structure)

	if (times < 1) {
		parseNext(next, structure)
		return
	}
	if (times === 1) {
		parseNext(statement, structure)
		parseNext(next, structure)
		return
	}
	const indexInstanceType = 'int'
	const indexInstance = computeInstanceName(structure, 'Repeat', attributes.id)
	parseInstaceDefinition(structure, indexInstance, indexInstanceType)

	structure.body += '// Repeat a specific number of times:\n'
	structure.body += `for (${indexInstance} = 0; ${indexInstance} < ${times}; ${indexInstance}++) {\n`
	parseNext(statement, structure)
	structure.body += 'yield()/* always yeild in the end of a loop */;\n}\n'
	parseNext(next, structure)
}

export default generator
