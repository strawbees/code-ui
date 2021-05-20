import {
	parseNext,
	getValueBlockByAttributeName,
	getBlockBody,
} from '../../utils/simulatorParsing'

const generator = ({ value, next }, structure) => {
	const operand1Block = getValueBlockByAttributeName(value, 'OPERAND1')
	const operand2Block = getValueBlockByAttributeName(value, 'OPERAND2')
	if (!operand1Block || !operand2Block) {
		parseNext(next, structure)
		return
	}
	const operand1 = getBlockBody(operand1Block, structure)
	const operand2 = getBlockBody(operand2Block, structure)
	structure.body += `(${operand1} && ${operand2})/* and */`
	parseNext(next, structure)
}

export default generator
