import { parseNext } from '../../utils/parsing'

export default ({ next, statement }, structure) => {
	structure.body += 'while(true) {\n'
	parseNext(statement, structure)
	structure.body += 'Bot::update();\n}\n'
	parseNext(next, structure)
}
