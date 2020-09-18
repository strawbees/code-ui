import {
	parseNext,
	getValueBlockByAttributeName,
	getBlockBody
} from '../../utils/parsing'

const generator = ({ value, next }, structure) => {
	const conditionBlock = getValueBlockByAttributeName(value, 'CONDITION')
	if (!conditionBlock) {
		parseNext(next, structure)
		return
	}
	const condition = getBlockBody(conditionBlock, structure)
	structure.body += `while(!${condition}) {\n`
	structure.body += 'ptYield();\n'
	structure.body += '}\n'
	parseNext(next, structure)
}

export default generator
