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
	structure.body += '// Repeat until the condition is false:\n'
	structure.body += `while(!${condition}) {\n`
	parseNext(statement, structure)
	structure.body += 'ptYield();\n'
	structure.body += '}\n'
	parseNext(next, structure)
}

export default generator
