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

const generator = ({ attributes, value, next }, structure) => {
	const placeBlock = getValueBlockByAttributeName(value, 'PLACE')
	if (!placeBlock) {
		parseNext(next, structure)
		return
	}
	const place = getBlockBody(placeBlock, structure)

	const positionBlock = getValueBlockByAttributeName(value, 'POSITION')
	if (!positionBlock) {
		parseNext(next, structure)
		return
	}
	const position = getBlockBody(positionBlock, structure)

	const durationBlock = getValueBlockByAttributeName(value, 'DURATION')
	if (!durationBlock) {
		parseNext(next, structure)
		return
	}
	const duration = getBlockBody(durationBlock, structure)

	const easingBlock = getValueBlockByAttributeName(value, 'EASING')
	if (!easingBlock) {
		parseNext(next, structure)
		return
	}
	const easing = getBlockBody(easingBlock, structure)

	const type = 'ServoMotor'
	const instance = computeInstanceName(structure, type, place)

	parseInstaceDefinition(structure, instance, type)
	setInstacePropertyOneTimeAssignment(structure, instance, 'place', place)

	// global variables to control to feed into the tweening function
	const startVar = computeInstanceName(structure, 'servoS', attributes.id)
	const beginVar = computeInstanceName(structure, 'servoB', attributes.id)
	const changeVar = computeInstanceName(structure, 'servoC', attributes.id)
	const durationVar = computeInstanceName(structure, 'servoD', attributes.id)
	parseInstaceDefinition(structure, startVar, 'float')
	parseInstaceDefinition(structure, beginVar, 'float')
	parseInstaceDefinition(structure, changeVar, 'float')
	parseInstaceDefinition(structure, durationVar, 'float')

	structure.body += `// Transition the position of the servo at ${place}\n`
	structure.body += `// to ${position}, over ${duration}s, using the ${easing} function:\n`
	structure.body += '{\n'
	structure.body += `${startVar} = Bot::seconds();\n`
	structure.body += `${beginVar} = `
	parseInstacePropertyRetrieval(structure, instance, 'position')
	structure.body += ';\n'
	structure.body += `${changeVar} = ${position} - ${beginVar};\n`
	structure.body += `${durationVar} = ${duration};\n`
	structure.body += `while (Bot::seconds() < ${startVar} + ${durationVar}) {\n`
	parseInstacePropertyAssignmentFromValue(structure, instance, 'position',
		`Easing::function(${easing}, Bot::seconds() - ${startVar}, ${beginVar}, ${changeVar}, ${durationVar})`
	)
	structure.body += 'Bot::update();\n'
	structure.body += '}\n'
	parseInstacePropertyAssignmentFromValue(structure, instance, 'position', position)
	structure.body += '}\n'

	parseNext(next, structure)
}

export default generator
