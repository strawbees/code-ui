import {
	parseNext,
	getValueBlockByAttributeName,
	getBlockBody,
} from '../../utils/simulatorParsing'

const generator = ({ value, next }, structure) => {
	const num1Block = getValueBlockByAttributeName(value, 'NUM1')
	const num2Block = getValueBlockByAttributeName(value, 'NUM2')
	if (!num1Block || !num2Block) {
		parseNext(next, structure)
		return
	}
	const num1 = getBlockBody(num1Block, structure)
	const num2 = getBlockBody(num2Block, structure)
	structure.body += `(${num1} * ${num2})/* multiplication */`
	parseNext(next, structure)
}

export default generator
