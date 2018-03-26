import parsing from './../../utils/parsing'

const {
	parseNext
} = parsing

export default ({ NEXT }, structure) => {
	parseNext(NEXT, structure)
}
