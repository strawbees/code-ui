import {
	parseNext,
	getValueBlockByAttributeName,
	getBlockBody,
} from '../../utils/simulatorParsing'

const generator = ({ value, next }, structure) => {
	const conditionBlock = getValueBlockByAttributeName(value, 'CONDITION')
	if (!conditionBlock) {
		parseNext(next, structure)
		return
	}
	const condition = getBlockBody(conditionBlock, structure)
	structure.body += '// Wait until the condition is true...\n'
	structure.body += `await pt.WaitUntil(async () => ${condition});\n`
	parseNext(next, structure)
}

export default generator
