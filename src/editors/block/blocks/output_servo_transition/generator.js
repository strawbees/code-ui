import {
	parseNext,
	getValueBlockByAttributeName,
	computeInstanceName,
	parseInstaceDefinition,
	getBlockBody,
	parseInstacePropertyAssignmentFromValue,
	parseInstacePropertyRetrieval,
	setInstacePropertyOneTimeAssignment
} from '../../utils/parsing'

export default ({ value, next }, structure) => {
	const placeBlock = getValueBlockByAttributeName(value, 'PLACE')
	if (!placeBlock) {
		parseNext(next, structure)
		return
	}
	const place = getBlockBody(placeBlock)
	const positionBlock = getValueBlockByAttributeName(value, 'POSITION')
	if (!positionBlock) {
		parseNext(next, structure)
		return
	}
	const durationBlock = getValueBlockByAttributeName(value, 'DURATION')
	if (!durationBlock) {
		parseNext(next, structure)
		return
	}
	const easingBlock = getValueBlockByAttributeName(value, 'EASING')
	if (!easingBlock) {
		parseNext(next, structure)
		return
	}
	const easing = getBlockBody(easingBlock)
	const type = 'ServoMotor'
	const instance = computeInstanceName(structure, type, place)

	parseInstaceDefinition(structure, instance, type)
	setInstacePropertyOneTimeAssignment(structure, instance, 'place', place)

	structure.body += '{\n'
	structure.body += 'float b = '
	parseInstacePropertyRetrieval(structure, instance, 'position')
	structure.body += ';\n'
	structure.body += `float c = ${getBlockBody(positionBlock)} - b;\n`
	structure.body += `float d = ${getBlockBody(durationBlock)};\n`
	structure.body += 'float s = Bot::seconds();\n'
	structure.body += 'while (Bot::seconds() < s + d) {\n'
	structure.body += 'float t = Bot::seconds() - s;\n'
	parseInstacePropertyAssignmentFromValue(structure, instance, 'position', `Easing::function(${easing}, t, b, c, d)`)
	structure.body += 'Bot::update();\n'
	structure.body += '}\n'
	parseInstacePropertyAssignmentFromValue(structure, instance, 'position', getBlockBody(positionBlock))
	structure.body += '}\n'

	parseNext(next, structure)
}
