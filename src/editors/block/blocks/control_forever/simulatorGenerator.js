import { parseNext } from '../../utils/simulatorParsing'

const generator = ({ next, statement }, structure) => {
	structure.body += '// Repeat forever:\n'
	structure.body += 'while(true) {\n'
	parseNext(statement, structure)
	structure.body += 'ptYield();\n}\n'
	parseNext(next, structure)
}

export default generator
