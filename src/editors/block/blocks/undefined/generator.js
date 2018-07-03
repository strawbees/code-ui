import { parseNext } from '../../utils/parsing'

export default ({ next, attributes }, structure) => {
	structure.body += `/* ${attributes.type} */`
	parseNext(next, structure)
}
