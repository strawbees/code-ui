import {
	parseNext,
	getValueBlockByAttributeName,
	getBlockBody
} from '../../utils/parsing'

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
	structure.body += 'yield()/* always yeild in the end of a loop */;\n'
	structure.body += '}\n'
	parseNext(next, structure)
}

export default generator
