import {
	getNext,
	computeInstanceName,
	parseInstaceDefinition,
	getBlockBody
} from '../../utils/parsing'

export default ({ statement, next }, structure) => {
	const id = statement &&
		statement[0] &&
		statement[0].shadow &&
		statement[0].shadow[0] &&
		statement[0].shadow[0].mutation &&
		statement[0].shadow[0].mutation[0] &&
		statement[0].shadow[0].mutation[0].attributes &&
		statement[0].shadow[0].mutation[0].attributes.proccode

	const instance = computeInstanceName(structure, 'procedure', id)

	const args = (
		statement &&
		statement[0] &&
		statement[0].shadow &&
		statement[0].shadow[0] &&
		statement[0].shadow[0].value &&
		statement[0].shadow[0].value.map((value, i) => {
			const name = `arg${i + 1}`
			const rawType = value.shadow &&
				value.shadow[0] &&
				value.shadow[0].attributes &&
				value.shadow[0].attributes.type
			const argId = value.shadow &&
				value.shadow[0] &&
				value.shadow[0].field &&
				value.shadow[0].field[0]
			const type = rawType === 'argument_reporter_boolean' ? 'bool' : 'float'
			const argDefault = rawType === 'argument_reporter_boolean' ? false : 0
			return {
				id      : argId,
				default : argDefault,
				type,
				name,
			}
		})
	) || []

	structure.procedures[id] = args

	const type = 'void'


	let procedure = `${instance}(${args.map(arg => `${arg.type} ${arg.name}`).join(', ')})`
	procedure += ` {\n${getBlockBody(getNext(next), structure)}}`

	parseInstaceDefinition(structure, procedure, type)
}
