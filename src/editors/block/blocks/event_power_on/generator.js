import {
	getNext,
	computeInstanceName,
	parseEventDefinition,
	getBlockBody,
} from '../../utils/parsing'

const generator = ({ attributes, next }, structure) => {
	const instance = computeInstanceName(structure, 'event_when_program_starts', attributes.id)
	let body = ''
	body += '// Code that runs when the program starts:\n'
	body += getBlockBody(getNext(next), structure)
	parseEventDefinition(structure, instance, body)
}

export default generator
