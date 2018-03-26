import parsing from './../../utils/parsing'

const {
	parseNext,
	getValueBlockByAttributeName,
	getBlockBody
} = parsing

export default ({ VALUE, NEXT }, structure) => {
	const operandBlock = getValueBlockByAttributeName(VALUE, 'OPERAND')
	if (!operandBlock) {
		parseNext(NEXT, structure)
		return
	}
	const operand = getBlockBody(operandBlock, structure)
	structure.body += `(!${operand})`
	parseNext(NEXT, structure)
}
