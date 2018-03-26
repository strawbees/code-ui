import parsing from './../../utils/parsing'

const {
	parseNext,
	getValueBlockByAttributeName,
	getBlockBody
} = parsing

export default ({ VALUE, NEXT }, structure) => {
	const numBlock = getValueBlockByAttributeName(VALUE, 'NUM')
	if (!numBlock) {
		parseNext(NEXT, structure)
		return
	}
	const num = getBlockBody(numBlock, structure)
	structure.body += `round(${num})`
	parseNext(NEXT, structure)
}
