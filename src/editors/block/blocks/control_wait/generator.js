import {
	parseNext,
	getValueBlockByAttributeName,
	getBlockBody
} from '../../utils/parsing'

const generator = ({ value, next }, structure) => {
	const durationBlock = getValueBlockByAttributeName(value, 'DURATION')
	if (!durationBlock) {
		parseNext(next, structure)
		return
	}
	const seconds = getBlockBody(durationBlock, structure) || 0
	structure.body += `delay(${seconds} * 1000);\n`
	parseNext(next, structure)
}

export default generator
