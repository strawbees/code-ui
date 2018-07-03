import {
	parseNext,
	getValueBlockByAttributeName,
	getBlockBody
} from '../../utils/parsing'

export default ({ value, next, statement }, structure) => {
	const conditionBlock = getValueBlockByAttributeName(value, 'CONDITION')
	if (!conditionBlock) {
		parseNext(next, structure)
		return
	}
	const condition = getBlockBody(conditionBlock, structure)
	structure.body += `while(${condition}) {\n`
	parseNext(statement, structure)
	structure.body += 'Bot::update();\n'
	structure.body += '}\n'
	parseNext(next, structure)
}
