import {
	parseNext,
	getValueBlockByAttributeName,
	getBlockBody,
} from '../../utils/simulatorParsing'

const generator = ({ value, next }, structure) => {
	const operandBlock = getValueBlockByAttributeName(value, 'OPERAND')
	if (!operandBlock) {
		parseNext(next, structure)
		return
	}
	const operand = getBlockBody(operandBlock, structure)
	structure.body += `!${operand}/* not */`
	parseNext(next, structure)
}

export default generator
