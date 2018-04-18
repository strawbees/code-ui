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
	const name = `${lowerCaseType}${count === 1 ? '' : count}`
	structure.instances[`${type}${id}`] = name
	return name
}

export const parseInstaceDefinition = (structure, instance, type) => {
	structure.definitions[instance] = `${type} ${instance};\n`
}
export const parseInstacePropertyRetrieval = (structure, instance, property) => {
	structure.body += `${instance}.${property}.get()`
}
export const parseInstacePropertyAssignment = (block, structure, instance, property) => {
	structure.body += `${instance}.${property} = `
	parseBlock(block, structure)
	structure.body += ';\n'
}
export const parseInstacePropertyOneTimeAssignment = (block, structure, instance, property) => {
	structure.oneTimeAssignments[`${instance}.${property}`] =
		`${instance}.${property} = ${getBlockBody(block, structure)};\n`
}
export const setInstacePropertyOneTimeAssignment = (structure, instance, property, value) => {
	structure.oneTimeAssignments[`${instance}.${property}`] =
		`${instance}.${property} = ${value}; \n`
}
export const getBlockBody = (block, structure) => {
	const tempStructure = {
		...structure,
		body : ''
	}
	parseBlock(block, tempStructure)
	return tempStructure.body
}
export const parseBlock = (block, structure) => {
	if (!block) {
		return
	}
	if (block.attributes &&
		block.attributes.type &&
		GENERATORS[block.attributes.type]) {
		GENERATORS[block.attributes.type](block, structure)
	} else {
		GENERATORS.undefined(block, structure)
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
		oneTimeAssignments
	} = structure
	definitions = Object.values(definitions).sort().join('')
	oneTimeAssignments = Object.values(oneTimeAssignments).sort().join('')

	const {
		header,
		body
	} = structure

	const raw = `${header}\n` +
	`${definitions}\n` +
	'void setup() {\n' +
	`${oneTimeAssignments}\n` +
	`${body}` +
	'}\n\n' +
	'void loop() {\n}\n'


	return indent(raw)
}
const indent = string => {
	let braces = 0
	let formated = ''
	for (let i = 0; i < string.length; i++) {
		let char = string[i]
		let nextChar = string[i + 1]
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
		header             : '#include "Quirkbot.h"\n',
		types              : {},
		instances          : {},
		definitions        : {},
		oneTimeAssignments : {},
		body               : ''
	}
	const start = json && json.block && json.block[0]
	parseBlock(start, structure)
	return assembleStructure(structure)
}
