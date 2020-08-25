import { parseNext } from '../../utils/parsing'

const generator = ({ next, statement }, structure) => {
	structure.body += 'while(true) {\n'
	parseNext(statement, structure)
	structure.body += 'Bot::update();\n}\n'
	parseNext(next, structure)
}

export default generator
