import {
	parseNext,
	getValueBlockByAttributeName,
	getBlockBody,
} from '../../utils/simulatorParsing'

const generator = ({ value, next }, structure) => {
	const durationBlock = getValueBlockByAttributeName(value, 'DURATION')
	if (!durationBlock) {
		parseNext(next, structure)
		return
	}
	const seconds = getBlockBody(durationBlock, structure) || 0
	structure.body += '// Wait...\n'
	structure.body += `await pt.Sleep(${seconds} * 1000)/* seconds to milliseconds */;\n`
	parseNext(next, structure)
}

export default generator
