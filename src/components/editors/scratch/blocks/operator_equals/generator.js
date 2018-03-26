import parsing from './../../utils/parsing'

const {
	parseNext,
	getValueBlockByAttributeName,
	getBlockBody
} = parsing

export default ({ VALUE, NEXT }, structure) => {
	const operand1Block = getValueBlockByAttributeName(VALUE, 'OPERAND1')
	const operand2Block = getValueBlockByAttributeName(VALUE, 'OPERAND2')
	if (!operand1Block || !operand2Block) {
		parseNext(NEXT, structure)
		return
	}
	const operand1 = getBlockBody(operand1Block, structure)
	const operand2 = getBlockBody(operand2Block, structure)
	structure.body += `(${operand1} == ${operand2})`
	parseNext(NEXT, structure)
}
