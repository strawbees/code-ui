import {
	parseNext,
	getValueBlockByAttributeName,
	getBlockBody
} from '../../utils/parsing'

const generator = ({ value, next }, structure) => {
	const fromBlock = getValueBlockByAttributeName(value, 'FROM')
	const toBlock = getValueBlockByAttributeName(value, 'TO')
	if (!fromBlock || !toBlock) {
		parseNext(next, structure)
		return
	}
	const from = getBlockBody(fromBlock, structure)
	const to = getBlockBody(toBlock, structure)
	structure.body += `/* random */ ((float)random(${from} * 1000, ${to}  * 1000) / 1000.0)`
	parseNext(next, structure)
}

export default generator
