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
	structure.body += `if (${condition}) {\n`
	parseNext(statement, structure)
	structure.body += '}\n'
	parseNext(next, structure)
}

export default generator
