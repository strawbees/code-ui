import parsing from './../../utils/parsing'

const {
	parseNext
} = parsing

export default ({ NEXT, attributes }, structure) => {
	structure.body += `/* ${attributes.type} */`
	parseNext(NEXT, structure)
}
