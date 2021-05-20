import {
	parseNext,
	getBlockBody,
} from '../../utils/parsing'

const generator = ({ next, mutation, value }, structure) => {
	const procCode = (
		mutation &&
		mutation[0] &&
		mutation[0].attributes &&
		mutation[0].attributes.proccode
	) || ''

	const argumentIds = JSON.parse((
		mutation &&
		mutation[0] &&
		mutation[0].attributes &&
		mutation[0].attributes.argumentids
	) || '[]')

	const procId = `${procCode}${argumentIds.join('')}`

	if (!structure.procedures[procId]) {
		parseNext(next, structure)
		return
	}

	const { instance } = structure.procedures[procId]

	const args = argumentIds.map((argId, i) => {
		const argDefinition = structure.procedures[procId].args[i]
		let argValue = argDefinition.default
		const argRef = value && value.filter(v => v.attributes.name === argId).pop()
		if (argRef) {
			if (argRef.block) {
				argValue = getBlockBody(argRef.block[0], structure)
			} else if (!argRef.shadow[0].field[0].attributes) {
				[argValue] = argRef.shadow[0].field
			}
		}
		return argValue
	})

	structure.body += '// Call custom block:\n'
	structure.body += `spawnBlock(${instance}${(args && args.length) ? ', ' : ''}${args.join(', ')});\n`

	parseNext(next, structure)
}

export default generator
