import { parseNext } from '../../utils/simulatorParsing'

const generator = ({ next, statement }, structure) => {
	structure.body += '// Repeat forever:\n'
	structure.body += 'await createWhileLoop(() => true, async () => {\n'
	parseNext(statement, structure)
	structure.body += 'await pt.Yield();\n}, "forev "+Date.now())\n'
	parseNext(next, structure)
}

export default generator
