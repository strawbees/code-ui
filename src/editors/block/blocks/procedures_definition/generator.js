import {
	getNext,
	computeInstanceName,
	parseProcedureDefinition,
	getBlockBody
} from '../../utils/parsing'

export default ({ statement, next }, structure, shallow) => {
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

	// don't further process the body in case this is shallow run
	if (shallow) {
		return
	}

	const type = 'void'
	const body = getBlockBody(getNext(next), structure)

	parseProcedureDefinition(structure, instance, args, body, type)
}
