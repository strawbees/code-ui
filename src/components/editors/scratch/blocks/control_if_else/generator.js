import {
	parseNext,
	getValueBlockByAttributeName,
	getBlockBody
} from './../../utils/parsing'

export default ({ value, next, statement }, structure) => {
	const conditionBlock = getValueBlockByAttributeName(value, 'CONDITION')
	if (!conditionBlock) {
		parseNext(next, structure)
		return
	}
	const condition = getBlockBody(conditionBlock, structure)
	structure.body += `if (${condition}) {\n`
	parseNext([statement && statement[0]], structure)
	structure.body += '} else {\n'
	parseNext([statement && statement[1]], structure)
	structure.body += '}\n'
	parseNext(next, structure)
}
