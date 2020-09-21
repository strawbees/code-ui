import {
	getNext,
	computeInstanceName,
	getValueBlockByAttributeName,
	parseThreadDefinition,
	getBlockBody,
} from '../../utils/simulatorParsing'

const generator = ({ attributes, next, value }, structure) => {
	const conditionBlock = getValueBlockByAttributeName(value, 'CONDITION')
	if (!conditionBlock) {
		return
	}
	const condition = getBlockBody(conditionBlock, structure)

	let body = ''
	body += 'while (true) {\n'
	body += '// Code that runs everytime an event happens:\n'
	body += `if (${condition}) {\n`
	body += getBlockBody(getNext(next), structure)
	body += '}\n'
	body += 'ptYield();\n}\n'

	const instance = computeInstanceName(structure, 'event_when', attributes.id)
	parseThreadDefinition(structure, instance, body)
}

export default generator
