import { parseNext } from '../../utils/parsing'

const generator = ({ next, statement }, structure) => {
	structure.body += '// Repeat forever:\n'
	structure.body += 'while(true) {\n'
	parseNext(statement, structure)
	structure.body += 'yield();/* always yeild in the end of a loop */\n}\n'
	parseNext(next, structure)
}

export default generator
