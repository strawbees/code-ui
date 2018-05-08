import {
	parseNext,
	getValueBlockByAttributeName,
	getBlockBody
} from './../../utils/parsing'

export default ({ value, next, statement }, structure) => {
	const timesBlock = getValueBlockByAttributeName(value, 'TIMES')
	if (!timesBlock) {
		parseNext(next, structure)
		return
	}
	const times = getBlockBody(timesBlock, structure)
	structure.body += `for (int i = 0; i < ${times}; i++) {\n`
	parseNext(statement, structure)
	structure.body += 'Bot::update();\n}\n'
	parseNext(next, structure)
}
