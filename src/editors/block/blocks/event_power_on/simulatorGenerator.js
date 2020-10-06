import {
	getNext,
	computeInstanceName,
	parseEventDefinition,
	getBlockBody,
} from '../../utils/simulatorParsing'

const generator = ({ attributes, next }, structure) => {
	const instance = computeInstanceName(structure, 'event_when_program_starts', attributes.id)
	let body = ''
	body += '// Code that runs when program starts:\n'
	body += '{\n'
	body += getBlockBody(getNext(next), structure)
	body += '}\n'
	parseEventDefinition(structure, instance, body)
}

export default generator
