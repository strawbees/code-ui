import {
	parseNext,
	getValueBlockByAttributeName,
	computeInstanceName,
	parseInstaceDefinition,
	getBlockBody,
} from '../../utils/simulatorParsing'

const generator = ({
	attributes,
	value,
	next,
	statement,
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
	const indexInstanceType = 'Number'
	const indexInstance = computeInstanceName(structure, 'Repeat', attributes.id)
	parseInstaceDefinition(structure, indexInstance, indexInstanceType)

	structure.body += '// Repeat a specific number of times:\n'
	structure.body += `await createForLoop(async () => ${indexInstance} = 0, async () => ${indexInstance} < ${times}, async () => ${indexInstance}++, async () => {\n`
	parseNext(statement, structure)
	structure.body += 'await pt.Yield();\n})\n'
	parseNext(next, structure)
}

export default generator
