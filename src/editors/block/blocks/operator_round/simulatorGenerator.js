import {
	parseNext,
	getValueBlockByAttributeName,
	getBlockBody,
} from '../../utils/simulatorParsing'

const generator = ({ value, next }, structure) => {
	const numBlock = getValueBlockByAttributeName(value, 'NUM')
	if (!numBlock) {
		parseNext(next, structure)
		return
	}
	const num = getBlockBody(numBlock, structure)
	structure.body += `round(${num})/* round */`
	parseNext(next, structure)
}

export default generator
