import {
	parseNext,
	getValueBlockByAttributeName,
	getBlockBody
} from '../../utils/parsing'

export default ({ value, next }, structure) => {
	const operandBlock = getValueBlockByAttributeName(value, 'OPERAND')
	if (!operandBlock) {
		parseNext(next, structure)
		return
	}
	const operand = getBlockBody(operandBlock, structure)
	structure.body += `!${operand}`
	parseNext(next, structure)
}
