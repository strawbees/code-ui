import { parseNext } from '../../utils/simulatorParsing'

const generator = ({ next, statement }, structure) => {
	structure.body += '// Repeat forever:\n'
	structure.body += 'await createWhileLoop(async () => true, async () => {\n'
	parseNext(statement, structure)
	structure.body += 'await pt.Yield();\n});\n'
	parseNext(next, structure)
}

export default generator
