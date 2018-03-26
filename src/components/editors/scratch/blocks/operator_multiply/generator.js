import parsing from './../../utils/parsing'

const {
	parseNext,
	getValueBlockByAttributeName,
	getBlockBody
} = parsing

export default ({ VALUE, NEXT }, structure) => {
	const num1Block = getValueBlockByAttributeName(VALUE, 'NUM1')
	const num2Block = getValueBlockByAttributeName(VALUE, 'NUM2')
	if (!num1Block || !num2Block) {
		parseNext(NEXT, structure)
		return
	}
	const num1 = getBlockBody(num1Block, structure)
	const num2 = getBlockBody(num2Block, structure)
	structure.body += `(${num1} * ${num2})`
	parseNext(NEXT, structure)
}
