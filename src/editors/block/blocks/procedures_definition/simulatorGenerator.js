import { sanitizeCPPVariableName } from 'src/utils/string'
import {
	getNext,
	parseCustomBlockDefinition,
	getBlockBody,
} from '../../utils/simulatorParsing'

const generator = ({ statement, next }, structure, shallow) => {
	const procCode = (
		statement &&
		statement[0] &&
		statement[0].shadow &&
		statement[0].shadow[0] &&
		statement[0].shadow[0].mutation &&
		statement[0].shadow[0].mutation[0] &&
		statement[0].shadow[0].mutation[0].attributes &&
		statement[0].shadow[0].mutation[0].attributes.proccode
	) || ''

	const argumentNames = JSON.parse((
		statement &&
		statement[0] &&
		statement[0].shadow &&
		statement[0].shadow[0] &&
		statement[0].shadow[0].mutation &&
		statement[0].shadow[0].mutation[0] &&
		statement[0].shadow[0].mutation[0].attributes &&
		statement[0].shadow[0].mutation[0].attributes.argumentnames
	) || '[]')

	const argumentIds = JSON.parse((
		statement &&
		statement[0] &&
		statement[0].shadow &&
		statement[0].shadow[0] &&
		statement[0].shadow[0].mutation &&
		statement[0].shadow[0].mutation[0] &&
		statement[0].shadow[0].mutation[0].attributes &&
		statement[0].shadow[0].mutation[0].attributes.argumentids
	) || '[]')

	const procId = `${procCode}${argumentIds.join('')}`

	const procName = procCode.split('%').join('')

	const instance = sanitizeCPPVariableName(`block_${procName}`)

	const argsById = (
		statement &&
		statement[0] &&
		statement[0].shadow &&
		statement[0].shadow[0] &&
		statement[0].shadow[0].value &&
		statement[0].shadow[0].value.reduce((acc, value) => {
			const rawType = value.shadow &&
				value.shadow[0] &&
				value.shadow[0].attributes &&
				value.shadow[0].attributes.type
			const id = value.shadow &&
				value.shadow[0] &&
				value.shadow[0].field &&
				value.shadow[0].field[0]
			const name = sanitizeCPPVariableName(id)
			const type = rawType === 'argument_reporter_boolean' ? 'let' : 'let'
			const argDefault = rawType === 'argument_reporter_boolean' ? false : 0
			acc[id] = {
				id,
				type,
				name,
				default : argDefault,
			}
			return acc
		}, {})
	) || {}

	const args = argumentNames.map(id => argsById[id])
	structure.procedures[procId] = {
		instance,
		args
	}

	// don't further process the body in case this is shallow run
	if (shallow) {
		return
	}

	const type = 'void'
	let body = ''
	body += '// Code that runs when custom block is called:\n'
	body += '{\n'
	body += `${getBlockBody(getNext(next), structure)}`
	body += '}\n'

	parseCustomBlockDefinition(structure, instance, args, body, type)
}

export default generator
