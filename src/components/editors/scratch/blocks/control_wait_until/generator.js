import parsing from './../../utils/parsing'

const {
	parseNext,
	getValueBlockByAttributeName,
	getBlockBody
} = parsing

export default ({ VALUE, NEXT }, structure) => {
	const conditionBlock = getValueBlockByAttributeName(VALUE, 'CONDITION')
	if (!conditionBlock) {
		parseNext(NEXT, structure)
		return
	}
	const condition = getBlockBody(conditionBlock, structure)
	structure.body += `while(${condition}) {\n`
	structure.body += 'Bot::update();\n'
	structure.body += '}\n'
	parseNext(NEXT, structure)
}
