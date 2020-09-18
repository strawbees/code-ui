import {
	getNext,
	computeInstanceName,
	parseThreadDefinition,
	getBlockBody,
} from '../../utils/parsing'

const generator = ({ attributes, next }, structure) => {
	const instance = computeInstanceName(structure, 'event_power_on_', attributes.id)
	const body = `${getBlockBody(getNext(next), structure)}\nptYieldUntil(false);`
	const args = []
	parseThreadDefinition(structure, instance, args, body)
}

export default generator
