import {
	getNext,
	computeInstanceName,
	getValueBlockByAttributeName,
	parseEventDefinition,
	getBlockBody,
} from '../../utils/simulatorParsing'

const generator = ({ attributes, next, value }, structure) => {
	const conditionBlock = getValueBlockByAttributeName(value, 'CONDITION')
	if (!conditionBlock) {
		return
	}
	const condition = getBlockBody(conditionBlock, structure)

	let body = ''
	body += 'await createWhileLoop(() => true, async () => {\n'
	body += '// Code that runs everytime an event happens:\n'
	body += `if (${condition}) {\n`
	body += getBlockBody(getNext(next), structure)
	body += '}\n'
	body += 'await pt.Yield();\n})\n'

	const instance = computeInstanceName(structure, 'event_when', attributes.id)
	parseEventDefinition(structure, instance, body)
}

export default generator
