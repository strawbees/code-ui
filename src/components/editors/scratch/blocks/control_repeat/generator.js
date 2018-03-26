import parsing from './../../utils/parsing'

const {
	parseNext,
	getValueBlockByAttributeName,
	getBlockBody
} = parsing

export default ({ VALUE, NEXT, STATEMENT }, structure) => {
	const timesBlock = getValueBlockByAttributeName(VALUE, 'TIMES')
	if (!timesBlock) {
		parseNext(NEXT, structure)
		return
	}
	const times = getBlockBody(timesBlock, structure)
	structure.body += `for (int i = 0; i < ${times}; i++) {\n`
	parseNext(STATEMENT, structure)
	structure.body += 'Bot::update();\n}\n'
	parseNext(NEXT, structure)
}
