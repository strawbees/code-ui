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

	structure.body += '// Gradually transition servo position:\n'
	structure.body += `${startVar} = Bot::seconds(); // start time\n`
	structure.body += `${beginVar} = `
	parseInstacePropertyRetrieval(structure, instance, 'position')
	structure.body += '; // begin position\n'
	structure.body += `${changeVar} = ${position} - ${beginVar}; // change in position\n`
	structure.body += `${durationVar} = ${duration}; // duration of transition\n`
	structure.body += `while (Bot::seconds() < ${startVar} + ${durationVar}) {\n`
	parseInstacePropertyAssignmentFromValue(structure, instance, 'position',
		`Easing::function(${easing}, Bot::seconds() - ${startVar}, ${beginVar}, ${changeVar}, ${durationVar})`
	)
	structure.body += 'ptYield();\n'
	structure.body += '}\n'
	parseInstacePropertyAssignmentFromValue(structure, instance, 'position', position)

	parseNext(next, structure)
}

export default generator
