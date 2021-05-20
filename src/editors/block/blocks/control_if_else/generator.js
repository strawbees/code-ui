import {
	parseNext,
	getValueBlockByAttributeName,
	getBlockBody,
} from '../../utils/parsing'

const generator = ({ value, next, statement }, structure) => {
	const conditionBlock = getValueBlockByAttributeName(value, 'CONDITION')
	if (!conditionBlock) {
		parseNext(next, structure)
		return
	}
	const condition = getBlockBody(conditionBlock, structure)
	structure.body += '// If the condition is true, run this code:\n'
	structure.body += `if (${condition}) {\n`
	parseNext([statement && statement[0]], structure)
	structure.body += '} else {\n'
	structure.body += '// ...otherwise, run this code:\n'
	parseNext([statement && statement[1]], structure)
	structure.body += '}\n'
	parseNext(next, structure)
}

export default generator
