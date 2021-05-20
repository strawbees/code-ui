import { sanitizeCPPVariableName } from 'src/utils/string'
import {
	getNext,
	parseCustomBlockDefinition,
	getBlockBody,
} from '../../utils/parsing'

const generator = ({ statement, next }, structure, shallow) => {
	const procCode = statement?.[0]?.shadow?.[0]?.mutation?.[0]?.attributes?.proccode || ''

	const procName = procCode.split('%').join('')

	const instance = sanitizeCPPVariableName(`block_${procName}`)

	const argNames = JSON.parse(statement?.[0]?.shadow?.[0]?.mutation?.[0]?.attributes?.argumentnames || '[]')

	const argumentIds = JSON.parse(statement?.[0]?.shadow?.[0]?.mutation?.[0]?.attributes?.argumentids || '[]')

	const procId = `${procCode}${argumentIds.join('')}`

	const argsById = statement?.[0]?.shadow?.[0]?.value?.reduce?.((acc, value) => {
		const rawType = value?.shadow?.[0]?.attributes?.type
		let id = value?.shadow?.[0]?.field?.[0]
		if (typeof id !== 'string') {
			id = 'arg'
		}
		const name = sanitizeCPPVariableName(id)
		const type = rawType === 'argument_reporter_boolean' ? 'bool' : 'float'
		const argDefault = rawType === 'argument_reporter_boolean' ? false : 0
		acc[id] = {
			id,
			type,
			name,
			default : argDefault,
		}
		return acc
	}, {}) || {}

	const args = argNames.map(id => argsById[id])

	structure.procedures[procId] = {
		instance,
		args,
	}

	// don't further process the body in case this is shallow run
	if (shallow) {
		return
	}
	const body = getBlockBody(getNext(next), structure)

	parseCustomBlockDefinition(structure, instance, args, body)
}

export default generator
