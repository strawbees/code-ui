import {
	getNext,
	computeInstanceName,
	getValueBlockByAttributeName,
	parseThreadDefinition,
	getBlockBody,
} from '../../utils/parsing'

const generator = ({ attributes, next, value }, structure) => {
	const conditionBlock = getValueBlockByAttributeName(value, 'CONDITION')
	if (!conditionBlock) {
		return
	}
	const condition = getBlockBody(conditionBlock, structure)

	let body = ''
	body += `while (true) {\nif (${condition}) {\n`
	body += getBlockBody(getNext(next), structure)
	body += '}\nptYield();\n}'

	const instance = computeInstanceName(structure, 'event_when', attributes.id)
	parseThreadDefinition(structure, instance, body)
}

export default generator
