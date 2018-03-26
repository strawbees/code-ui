import parsing from './../../utils/parsing'

const {
	parseNext,
	getValueBlockByAttributeName,
	getBlockBody
} = parsing

export default ({ VALUE, NEXT }, structure) => {
	const durationBlock = getValueBlockByAttributeName(VALUE, 'DURATION')
	if (!durationBlock) {
		parseNext(NEXT, structure)
		return
	}
	const seconds = getBlockBody(durationBlock, structure) || 0
	structure.body += `delay(${seconds} * 1000);\n`
	parseNext(NEXT, structure)
}
