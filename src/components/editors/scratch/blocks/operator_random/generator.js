import parsing from './../../utils/parsing'

const {
	parseNext,
	getValueBlockByAttributeName,
	getBlockBody
} = parsing

export default ({ VALUE, NEXT }, structure) => {
	const fromBlock = getValueBlockByAttributeName(VALUE, 'FROM')
	const toBlock = getValueBlockByAttributeName(VALUE, 'TO')
	if (!fromBlock || !toBlock) {
		parseNext(NEXT, structure)
		return
	}
	const from = getBlockBody(fromBlock, structure)
	const to = getBlockBody(toBlock, structure)
	structure.body += `(${from} + ((float)random(1000000) / 1000000) * (${to} - ${from}))`
	parseNext(NEXT, structure)
}
