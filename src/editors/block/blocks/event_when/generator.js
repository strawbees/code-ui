import {
	getNext,
	computeInstanceName,
	getValueBlockByAttributeName,
	parseEventDefinition,
	getBlockBody,
} from '../../utils/parsing'

const generator = ({ attributes, next, value }, structure) => {
	const conditionBlock = getValueBlockByAttributeName(value, 'CONDITION')
	if (!conditionBlock) {
		return
	}
	const condition = getBlockBody(conditionBlock, structure)

	let body = ''
	body += 'while (true) {\n'
	body += '// Code that runs when an event happens:\n'
	body += `if (${condition}) {\n`
	body += getBlockBody(getNext(next), structure)
	body += '}\n'
	body += 'yield();/* always yeild in the end of a loop */\n}\n'

	const instance = computeInstanceName(structure, 'event_when', attributes.id)
	parseEventDefinition(structure, instance, body)
}

export default generator
