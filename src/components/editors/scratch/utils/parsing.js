const GENERATORS = {}
const registerGenerator = (key, generator) => GENERATORS[key] = generator
const getNext = container => container && container[0] && container[0].BLOCK && container[0].BLOCK[0]
const parseNext = (container, structure) => {
	const next = getNext(container)
	if (next) {
		parseBlock(next, structure)
	}
}
const getValueBlockByAttributeName = (nodes, name) => {
	if (!nodes) {
		return null
	}
	const node = nodes.filter(({ attributes }) => attributes.name === name).pop()
	if (!node) {
		return null
	}
	const { SHADOW, BLOCK } = node
	if (BLOCK && BLOCK[0]) {
		return BLOCK[0]
	}
	if (SHADOW && SHADOW[0]) {
		return SHADOW[0]
	}
	return null
}
const getFildByAttributeType = (node, type) => {
	if (!node) {
		return null
	}
	if (node.attributes.type !== type) {
		return null
	}
	return node.FIELD[0]
}
const computeInstanceName = (type, extra) =>
	`${type.charAt(0).toLowerCase()}${type.slice(1)}${extra && `_${extra}`}`
const parseInstaceDefinition = (structure, instance, type) => {
	structure.definitions[instance] = `${type} ${instance};\n`
}
const parseInstacePropertyRetrieval = (structure, instance, property) => {
	structure.body += `${instance}.${property}.get()`
}
const parseInstacePropertyAssignment = (block, structure, instance, property) => {
	structure.body += `${instance}.${property} = `
	parseBlock(block, structure)
	structure.body += ';\n'
}
const parseInstacePropertyOneTimeAssignment = (block, structure, instance, property) => {
	structure.oneTimeAssignments[`${instance}.${property}`] =
		`${instance}.${property} = ${getBlockBody(block, structure)}; \n`
}
const setInstacePropertyOneTimeAssignment = (structure, instance, property, value) => {
	structure.oneTimeAssignments[`${instance}.${property}`] =
		`${instance}.${property} = ${value}; \n`
}
const getBlockBody = (block, structure) => {
	const tempStructure = {
		...structure,
		body : ''
	}
	parseBlock(block, tempStructure)
	return tempStructure.body
}
const parseBlock = (block, structure) => {
	if (!block) {
		return
	}
	if (block.attributes &&
		block.attributes.type &&
		GENERATORS[block.attributes.type]) {
		GENERATORS[block.attributes.type](block, structure)
	} else {
		GENERATORS[block.undefined](block, structure)
	}
}
const assembleStructure = structure =>
	`${structure.header}\n` +
	`${Object.values(structure.definitions).join('')}\n` +
	'void setup() {\n' +
	`\t${Object.values(structure.oneTimeAssignments).join('\t')}\n` +
	`\t${structure.body.split('\n').join('\n\t')}\n` +
	'}\n' +
	'void loop() {}\n'

export default {
	registerGenerator,
	getNext,
	parseNext,
	getValueBlockByAttributeName,
	getFildByAttributeType,
	computeInstanceName,
	parseInstaceDefinition,
	parseInstacePropertyRetrieval,
	parseInstacePropertyAssignment,
	parseInstacePropertyOneTimeAssignment,
	setInstacePropertyOneTimeAssignment,
	getBlockBody,
	parseBlock,
	assembleStructure
}
