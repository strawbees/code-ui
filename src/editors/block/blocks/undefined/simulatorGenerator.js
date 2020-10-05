import { parseNext } from '../../utils/simulatorParsing'

const generator = ({ next, attributes }, structure) => {
	structure.body += `/* ${attributes.type} */`
	parseNext(next, structure)
}

export default generator
