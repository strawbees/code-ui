import {
	parseNext,
	getValueBlockByAttributeName,
	getBlockBody
} from '../../utils/simulatorParsing'

const generator = ({ value, next, statement }, structure) => {
	const conditionBlock = getValueBlockByAttributeName(value, 'CONDITION')
	if (!conditionBlock) {
		parseNext(next, structure)
		return
	}
	const condition = getBlockBody(conditionBlock, structure)
	structure.body += '// Runs only if the condition is true:\n'
	structure.body += `if (${condition}) {\n`
	parseNext(statement, structure)
	structure.body += '}\n'
	parseNext(next, structure)
}

export default generator
