import parsing from './../../utils/parsing'

const {
	parseNext
} = parsing

export default ({ NEXT, STATEMENT }, structure) => {
	structure.body += 'while(true) {\n'
	parseNext(STATEMENT, structure)
	structure.body += 'Bot::update();\n}\n'
	parseNext(NEXT, structure)
}
