import {
	parseNext,
	getValueBlockByAttributeName,
	computeInstanceName,
	parseInstaceDefinition,
	getBlockBody,
	parseNodeInstacePropertyAssignmentFromValue,
	parseNodeInstacePropertyRetrieval,
	setNodeInstacePropertyOneTimeAssignment
} from '../../utils/simulatorParsing'

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
	setNodeInstacePropertyOneTimeAssignment(structure, instance, 'place', place)

	// global variables to control to feed into the tweening function
	const startVar = computeInstanceName(structure, 'servoS', attributes.id)
	const beginVar = computeInstanceName(structure, 'servoB', attributes.id)
	const changeVar = computeInstanceName(structure, 'servoC', attributes.id)
	const durationVar = computeInstanceName(structure, 'servoD', attributes.id)
	parseInstaceDefinition(structure, startVar, 'Number')
	parseInstaceDefinition(structure, beginVar, 'Number')
	parseInstaceDefinition(structure, changeVar, 'Number')
	parseInstaceDefinition(structure, durationVar, 'Number')

	structure.body += '// Gradually transition servo position:\n'
	structure.body += `${startVar} = Bot.seconds(); // start time\n`
	structure.body += `${beginVar} = `
	parseNodeInstacePropertyRetrieval(structure, instance, 'position')
	structure.body += '; // begin position\n'
	structure.body += `${changeVar} = ${position} - ${beginVar}; // change in position\n`
	structure.body += `${durationVar} = ${duration}; // duration of transition\n`
	structure.body += `await createWhileLoop(() => Bot.seconds() < ${startVar} + ${durationVar}, async () => {\n`
	parseNodeInstacePropertyAssignmentFromValue(structure, instance, 'position',
		`Easing.function(${easing}, Bot.seconds() - ${startVar}, ${beginVar}, ${changeVar}, ${durationVar})`
	)
	structure.body += 'await pt.Yield();\n'
	structure.body += '})\n'
	parseNodeInstacePropertyAssignmentFromValue(structure, instance, 'position', position)

	parseNext(next, structure)
}

export default generator
