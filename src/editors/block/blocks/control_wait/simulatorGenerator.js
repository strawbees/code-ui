import {
	parseNext,
	getValueBlockByAttributeName,
	getBlockBody
} from '../../utils/simulatorParsing'

const generator = ({ value, next }, structure) => {
	const durationBlock = getValueBlockByAttributeName(value, 'DURATION')
	if (!durationBlock) {
		parseNext(next, structure)
		return
	}
	const seconds = getBlockBody(durationBlock, structure) || 0
	structure.body += '// Wait...\n'
	structure.body += `ptSleep(${seconds} /* seconds to milliseconds */ * 1000);\n`
	parseNext(next, structure)
}

export default generator
