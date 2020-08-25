import { parseNext } from '../../utils/parsing'

const generator = ({ next }, structure) => {
	parseNext(next, structure)
}

export default generator
