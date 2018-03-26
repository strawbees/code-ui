import parsing from './../../utils/parsing'

const {
	parseNext,
	getValueBlockByAttributeName,
	getBlockBody
} = parsing

export default ({ VALUE, NEXT, STATEMENT }, structure) => {
	const conditionBlock = getValueBlockByAttributeName(VALUE, 'CONDITION')
	if (!conditionBlock) {
		parseNext(NEXT, structure)
		return
	}
	const condition = getBlockBody(conditionBlock, structure)
	structure.body += `if(${condition}) {\n`
	parseNext(STATEMENT, structure)
	structure.body += '}\n'
	parseNext(NEXT, structure)
}
