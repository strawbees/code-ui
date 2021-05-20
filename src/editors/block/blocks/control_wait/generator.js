import {
	parseNext,
	getValueBlockByAttributeName,
	getBlockBody,
} from '../../utils/parsing'

const generator = ({ value, next }, structure) => {
	const durationBlock = getValueBlockByAttributeName(value, 'DURATION')
	if (!durationBlock) {
		parseNext(next, structure)
		return
	}
	const seconds = getBlockBody(durationBlock, structure) || 0
	structure.body += '// Wait...\n'
	structure.body += `wait(${seconds});\n`
	parseNext(next, structure)
}

export default generator
