import parsing from './../../utils/parsing'

const {
	parseNext,
	parseInstaceDefinition
} = parsing

export default ({ FIELD, NEXT }, structure) => {
	const name = FIELD && FIELD[0]

	parseInstaceDefinition(structure, name, 'float')

	structure.body += `${name}`

	parseNext(NEXT, structure)
}
