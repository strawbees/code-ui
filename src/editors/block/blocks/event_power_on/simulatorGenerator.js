import {
	getNext,
	computeInstanceName,
	parseThreadDefinition,
	getBlockBody,
} from '../../utils/simulatorParsing'

const generator = ({ attributes, next }, structure) => {
	const instance = computeInstanceName(structure, 'event_power_on_', attributes.id)
	let body = ''
	body += '// Code that runs when program starts:\n'
	body += '{\n'
	body += getBlockBody(getNext(next), structure)
	body += '}\n'
	parseThreadDefinition(structure, instance, body)
}

export default generator
