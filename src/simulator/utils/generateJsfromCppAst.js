/* eslint-disable camelcase */
const textOutputGenerator = (node) => node.text
const emptyGenerator = () => ''
const passThroughGenerator = (node) => {
	const { children } = node
	let code = ''
	code += children.map(generate).join('')
	return code
}

const GENERATORS = {}

GENERATORS['{'] = textOutputGenerator
GENERATORS['}'] = textOutputGenerator
GENERATORS['['] = textOutputGenerator
GENERATORS[']'] = textOutputGenerator
GENERATORS['('] = textOutputGenerator
GENERATORS[')'] = textOutputGenerator
GENERATORS[','] = textOutputGenerator
GENERATORS[';'] = textOutputGenerator
GENERATORS.string_literal = textOutputGenerator

GENERATORS['#include'] = () => 'import * from'

GENERATORS.storage_class_specifier = emptyGenerator

GENERATORS.argument_list = passThroughGenerator
GENERATORS.call_expression = passThroughGenerator
GENERATORS.function_declarator = passThroughGenerator
GENERATORS.parameter_list = passThroughGenerator
GENERATORS.translation_unit = passThroughGenerator

GENERATORS.preproc_include = (node) => {
	const { children } = node
	const [include, string_literal] = children.slice(-2)

	const path = generate(string_literal).replace('.h"', '"').split('"').join('\'')
	return `// ${generate(include)} ${path}\n`
}
GENERATORS.number_literal = (node) => {
	const { text } = node

	if (text.slice(-1) === 'f') {
		return text.slice(0, -1)
	}

	return text
}
GENERATORS.comment = (node) => {
	const { text } = node
	let code = ''
	code += text
	if (text.indexOf('//') === 0) {
		code += '\n'
	}
	return code
}
GENERATORS.thread_definition = (node) => {
	const { children } = node
	const [function_declarator, compound_statement] = children.slice(-2)

	return `${generateWithType('thread_declarator', function_declarator)} = async function _thread_ () ${generate(compound_statement)}\n`
}
GENERATORS.thread_declarator = (node) => {
	const { children } = node
	const [identifier, parameter_list] = children.slice(-2)

	const parameterListToKeyAccess = generate(parameter_list).replace('(', '[').replace(')', ']')
	return `${generate(identifier)}${parameterListToKeyAccess}`
}
GENERATORS.function_definition = (node) => {
	const { children } = node
	const [function_declarator, compound_statement] = children.slice(-2)

	const isThread = function_declarator?.children?.[0]?.text === 'THREAD'
	if (isThread) {
		return generateWithType('thread_definition', node)
	}
	return `async function ${[function_declarator, compound_statement].map(generate).join(' ')}\n`
}
GENERATORS.declaration = (node) => {
	const { children } = node
	const primitive_type = getValueOfFirstChildWithProp(children, 'primitive_type')
	const type_identifier = getValueOfFirstChildWithProp(children, 'type_identifier')

	const [type, identifier, semiColon] = children

	const intializer = primitive_type ? '' : ` = new ${type_identifier}(Bot)`
	const maybeNewLine = semiColon ? '\n' : ''

	return `${generate(type)} ${generate(identifier)}${intializer}${generate(semiColon)}${maybeNewLine}`
}
GENERATORS.identifier = (node) => {
	const { text } = node
	let code = ''
	code += text
	return code
}
GENERATORS.compound_statement = (node) => {
	const { children } = node
	let code = ''
	code += children.map(generate).join('')
	code = code.split('\n').join('\n\t')
	code = code.replace('{', '{\n\t')
	if (code.slice(-2) === '\t}') {
		code = `${code.slice(0, -2)}}`
	}
	return code
}
GENERATORS.expression_statement = (node) => {
	const { children } = node
	const [, semiColon] = children
	const maybeNewLine = semiColon ? '\n' : ''
	let code = ''
	code += children.map(generate).join('')
	code += maybeNewLine
	return code
}
GENERATORS.parameter_declaration = (node) => {
	const { children } = node
	const [type, identifier] = children
	return identifier ? generate(identifier) : `'${type.text}'`
}

GENERATORS.primitive_type = () => 'let'
GENERATORS.type_identifier = () => 'let'

const getFirstChildWithType = (children, type) =>
	children.filter(child => child.type === type).pop()

const getValueOfFirstChildWithProp = (children, key) => {
	const found = getFirstChildWithType(children, key)
	if (found) {
		return found.text
	}
	return null
}

const generate = (node) => {
	if (!node) {
		return '/**error: undefined node**/'
	}
	if (!GENERATORS[node.type]) {
		return `/**${node.type}**/`
	}
	return GENERATORS[node.type](node)
}
const generateWithType = (type, node) => {
	if (!GENERATORS[type]) {
		return `/* no generator for ${type} */\n`
	}
	return GENERATORS[type](node)
}

const generateJsfromCppAst = (tree) => {
	const recursiveLog = (node, indent) => {
		console.groupCollapsed(node.type)
		console.log(node.text)
		node.children.forEach(child => {
			recursiveLog(child, indent + 1)
		})
		console.groupEnd()
	}
	recursiveLog(tree.rootNode, 1)
	const js = generate(tree.rootNode)
	return js
}

export default generateJsfromCppAst
/* eslint-enable camelcase */
