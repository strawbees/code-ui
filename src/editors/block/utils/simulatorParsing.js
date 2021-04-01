import xmlToJson from './xmlToJson'

let GENERATORS
export const registerGenerators = generators => GENERATORS = generators
export const getNext = container =>
	container && container[0] && container[0].block && container[0].block[0]
export const parseNext = (container, structure) => {
	const next = getNext(container)
	if (next) {
		parseBlock(next, structure)
	}
}
export const getValueBlockByAttributeName = (nodes, name) => {
	if (!nodes) {
		return null
	}
	const node = nodes.filter(({ attributes }) => attributes.name === name).pop()
	if (!node) {
		return null
	}
	const { shadow, block } = node
	if (block && block[0]) {
		return block[0]
	}
	if (shadow && shadow[0]) {
		return shadow[0]
	}
	return null
}
export const getFildByAttributeType = (node, type) => {
	if (!node) {
		return null
	}
	if (node.attributes.type !== type) {
		return null
	}
	return node.field[0]
}
export const computeInstanceName = (structure, type, id) => {
	if (typeof structure.types[type] === 'undefined') {
		structure.types[type] = 0
	}
	if (structure.instances[`${type}${id}`]) {
		return structure.instances[`${type}${id}`]
	}
	structure.types[type]++
	const lowerCaseType = `${type.charAt(0).toLowerCase()}${type.slice(1)}`
	const count = structure.types[type]
	// const name = `${lowerCaseType}${count === 1 ? '' : count}`
	const name = `${lowerCaseType}${count}`
	structure.instances[`${type}${id}`] = name
	return name
}
export const parseInstaceDefinition = (structure, instance, type) => {
	let varType
	switch (type) {
		case 'Number':
			varType = 'let'
			break
		default:
			varType = 'const'
			break
	}
	let constructorArgs
	switch (type) {
		case 'Number':
		case 'Vector':
			constructorArgs = ''
			break
		default:
			constructorArgs = 'Bot'
			break
	}
	structure.definitions[instance] = `${type ? `${varType} ` : ''}${instance}${type ? ` = new ${type}(${constructorArgs})` : ''};\n`
}
export const parseCustomBlockDefinition = (structure, instance, args, body) => {
	const callArgs = `[${args.map(arg => arg.name).join(', ')}]`
	const call = `pt.DeclareBlock('${instance}'${args.length ? `, ${callArgs}` : ''})`
	parseInstaceDefinition(structure, call)
	structure.customBlockDefinition[instance] = `pt.DefineBlock('${instance}', async (${args.map(arg => arg.name).join(', ')}) => {\n`
	structure.customBlockDefinition[instance] += 'await pt.BeginBlock();\n'
	structure.customBlockDefinition[instance] += body
	structure.customBlockDefinition[instance] += 'await pt.EndBlock();\n});\n'
}
export const parseEventDefinition = (structure, instance, body) => {
	const call = `pt.DeclareEvent('${instance}')`
	parseInstaceDefinition(structure, call)
	structure.eventDefinition[instance] = `pt.DefineBlock('${instance}', async () => {\n`
	structure.eventDefinition[instance] += 'await pt.BeginEvent();\n'
	structure.eventDefinition[instance] += body
	structure.eventDefinition[instance] += 'await pt.EndEvent();\n});\n'
	structure.eventInit[instance] = `await pt.Init('${instance}');\n`
	structure.eventSchedule[instance] = `await pt.Schedule('${instance}');\n`
}
export const parseNodeInstacePropertyRetrieval = (structure, instance, property) => {
	structure.body += `${instance}.${property}.get()`
}
export const parseNodeInstacePropertyAssignment = (block, structure, instance, property) => {
	structure.body += `${instance}.${property}.set(`
	parseBlock(block, structure)
	structure.body += ');\n'
}
export const parseNodeInstacePropertyAssignmentFromValue = (structure, instance, property, value) => {
	structure.body += `${instance}.${property}.set(${value}); \n`
}
export const setNodeInstacePropertyOneTimeAssignment = (structure, instance, property, value) => {
	structure.oneTimeAssignments[`${instance}.${property}`] =
		`${instance}.${property}.set(${value}); \n`
}
export const setGlobalOneTimeStatement = (structure, statement) => {
	structure.oneTimeStatements[statement] =
		`${statement}; \n`
}
export const getBlockBody = (block, structure) => {
	const tempStructure = {
		...structure,
		body : ''
	}
	parseBlock(block, tempStructure)
	return tempStructure.body
}
export const parseBlock = (block, structure, shallow) => {
	if (!block) {
		return
	}
	if (block.attributes &&
		block.attributes.type &&
		GENERATORS[block.attributes.type]) {
		GENERATORS[block.attributes.type](block, structure, shallow)
	} else {
		GENERATORS.undefined(block, structure, shallow)
	}
}
export const indentString = (string, num = 1, template = '\t') => {
	const space = Array(num + 1).join(template)
	return space + string
		.replace(/\n/g, `\n${space}`)
		.replace(new RegExp(`\n${space}$`), '\n')
}
export const assembleStructure = structure => {
	let {
		definitions,
		customBlockDefinition,
		eventDefinition,
		eventInit,
		eventSchedule,
		oneTimeStatements,
		oneTimeAssignments,
	} = structure

	definitions = Object.values(definitions).sort().join('')
	customBlockDefinition = Object.values(customBlockDefinition).sort().join('')
	eventDefinition = Object.values(eventDefinition).sort().join('')
	eventInit = Object.values(eventInit).sort().join('')
	eventSchedule = Object.values(eventSchedule).sort().join('')
	oneTimeStatements = Object.values(oneTimeStatements).sort().join('')
	oneTimeAssignments = Object.values(oneTimeAssignments).sort().join('')

	const {
		body
	} = structure

	const raw = '' +
	`${definitions ?
		'// Forward declarations:\n' +
		`${definitions}\n` : ''}` +
	`${customBlockDefinition ?
		'// Custom blocks definitions:\n' +
		`${customBlockDefinition}\n` : ''}` +
	`${eventDefinition ?
		'// Events definitions:\n' +
		`${eventDefinition}\n` : ''}` +
	'// Setup code, that runs only once:\n' +
	'const setup = async () => {\n' +
		`${oneTimeStatements ? `${oneTimeStatements}\n` : ''}` +
		`${oneTimeAssignments ? `${oneTimeAssignments}\n` : ''}` +
		`${eventInit ?
			'// Initialize the events:\n' +
			`${eventInit}\n` : ''}` +
		`${body ? `${body}\n` : ''}` +
	'}\n\n' +
	'// Loop code, that runs repeatedly:\n' +
	'const loop = async () => {\n' +
		`${eventSchedule ?
			'// Schedule the events:\n' +
			`${eventSchedule}\n` : ''}` +
	'}\n'

	return indent(raw)
}
const indent = string => {
	let braces = 0
	let formated = ''
	for (let i = 0; i < string.length; i++) {
		let char = string[i]
		const nextChar = string[i + 1]
		if (char === '{') {
			braces++
		}
		if (nextChar === '}') {
			braces--
			braces = braces < 0 ? 0 : braces
		}
		if (braces && char === '\n') {
			char += Array(braces + 1).join('\t')
		}
		formated += char
	}
	formated = formated.split('{\n\t\n').join('{\n')
	formated = formated.split('\n\t\n}').join('\n}')
	return formated
}
export const generateCode = source => {
	if (typeof DOMParser === 'undefined') {
		return ''
	}
	const parser = new DOMParser()
	const xml = parser.parseFromString(source, 'text/xml')
	let json = xmlToJson(xml)
	if (json.xml && json.xml[0]) {
		[json] = json.xml
	}

	const structure = {
		types                 : {},
		instances             : {},
		procedures            : {},
		customBlockDefinition : {},
		eventDefinition       : {},
		eventInit             : {},
		eventSchedule         : {},
		definitions           : {},
		oneTimeAssignments    : {},
		oneTimeStatements     : {},
		body                  : ''
	}

	if (json && json.block) {
		// First deal with the events definitions
		json.block
			.filter(block =>
				block.attributes &&
				block.attributes.type === 'procedures_definition'
			)
			// pass the "shallow" argument as true, so we don't parse the actual
			// procedure body
			.forEach(block => parseBlock(block, structure, true))

		// Now parse both the customBlockDefinition and the events
		json.block
			.filter(block =>
				block.attributes &&
				(
					block.attributes.type === 'event_power_on' ||
					block.attributes.type === 'event_when' ||
					block.attributes.type === 'procedures_definition'
				)
			)
			.forEach(block => parseBlock(block, structure))
	}
	return assembleStructure(structure)
}
