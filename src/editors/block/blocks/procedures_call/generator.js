import {
	parseNext,
	computeInstanceName,
	getNext,
	getValueBlockByAttributeName,
	parseInstaceDefinition,
	getBlockBody
} from '../../utils/parsing'

export default (argu, structure) => {
	const { next, mutation, value } = argu

	const id = mutation &&
		mutation[0] &&
		mutation[0].attributes &&
		mutation[0].attributes.proccode

	const argIds = JSON.parse(
		(mutation &&
		mutation[0] &&
		mutation[0].attributes &&
		mutation[0].attributes.argumentids) || '[]'
	)

	const instance = computeInstanceName(structure, 'procedure', id)

	const args = argIds.map((argId, i) => {
		const argDefinition = structure.procedures[id][i]
		let argValue = argDefinition.default
		const argRef = value.filter(v => v.attributes.name === argId).pop()
		if (argRef) {
			if (argRef.block) {
				argValue = getBlockBody(argRef.block[0], structure)
			} else if (!argRef.shadow[0].field[0].attributes) {
				argValue = argRef.shadow[0].field[0]
			}

		}

		return argValue
	})

	structure.body += `${instance}(${args.join(', ')});\n`

	parseNext(next, structure)
}
