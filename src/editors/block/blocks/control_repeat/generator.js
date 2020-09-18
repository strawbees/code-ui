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
	const times = parseInt(getBlockBody(timesBlock, structure), 10)

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

	structure.body += `// Repeat ${times} times:\n`
	structure.body += `for (${indexInstance} = 0; ${indexInstance} < ${times}; ${indexInstance}++) {\n`
	parseNext(statement, structure)
	structure.body += 'Bot::update();\n}\n'
	parseNext(next, structure)
}

export default generator
