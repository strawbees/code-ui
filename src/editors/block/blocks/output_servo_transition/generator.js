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

export default ({ value, field, next }, structure) => {
	const easing = window.parseInt(field && field[0])
	const place = field && field[1]
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
	const type = 'ServoMotor'
	const instance = computeInstanceName(structure, type, place)

	parseInstaceDefinition(structure, instance, type)
	setInstacePropertyOneTimeAssignment(structure, instance, 'place', place)

	structure.body += '{\n'
	structure.body += `float d = ${getBlockBody(durationBlock)};\n`
	structure.body += 'float b = '
	parseInstacePropertyRetrieval(structure, instance, 'position')
	structure.body += ';\n'
	structure.body += `float c = ${getBlockBody(positionBlock)}; - b;\n`
	structure.body += 'float start = Bot::seconds();\n'
	structure.body += 'while (Bot::seconds() < start + d) {\n'
	structure.body += 'float t = Bot::seconds() - start;\n'
	structure.body += 'float p;\n'
	if (easing === 0) {
		// linear
		structure.body += 'p = b + (t / d) * c;\n'
	} else if (easing === 1) {
		// sine in
		structure.body += 'p = -c * cos(t/d * (PI/2)) + c + b;\n'
	} else if (easing === 2) {
		// sine out
		structure.body += 'p = c * sin(t/d * (PI/2)) + b;\n'
	} else if (easing === 3) {
		// sine in out
		structure.body += 'p = -c/2 * (cos(PI*t/d) - 1) + b;\n'
	} else if (easing === 4) {
		// expo in
		structure.body += 'p = (t==0) ? b : c * pow(2, 10 * (t/d - 1)) + b;\n'
	} else if (easing === 5) {
		// expo out
		structure.body += 'p = (t==d) ? b+c : c * (-pow(2, -10 * t/d) + 1) + b;\n'
	} else if (easing === 6) {
		// expo in out
		structure.body += 'if (t==0) p = b;\n'
		structure.body += 'else if (t==d) p = b+c;\n'
		structure.body += 'else if ((t/=d/2) < 1) p = c/2 * pow(2, 10 * (t - 1)) + b;\n'
		structure.body += 'else p = c/2 * (-pow(2, -10 * --t) + 2) + b;\n'
	}
	parseInstacePropertyAssignmentFromValue(structure, instance, 'position', 'p')
	structure.body += 'Bot::update();\n'
	structure.body += '}\n'
	parseInstacePropertyAssignmentFromValue(structure, instance, 'position', 'position')
	structure.body += '}\n'

	parseNext(next, structure)
}
