import {
	parseNext,
	getValueBlockByAttributeName,
	getBlockBody,
} from '../../utils/simulatorParsing'

const generator = ({ value, next, statement }, structure) => {
	const conditionBlock = getValueBlockByAttributeName(value, 'CONDITION')
	if (!conditionBlock) {
		parseNext(next, structure)
		return
	}
	const condition = getBlockBody(conditionBlock, structure)
	structure.body += '// Repeat until the condition is false:\n'
	structure.body += `await createWhileLoop(async () => !${condition}, async () => {\n`
	parseNext(statement, structure)
	structure.body += 'await pt.Yield();\n'
	structure.body += '})\n'
	parseNext(next, structure)
}

export default generator
