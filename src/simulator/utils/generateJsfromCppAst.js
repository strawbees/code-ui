/* eslint-disable camelcase */
const THREAD_METHODS_SIGNATURE = ['registerEvent', 'registerBlock', 'initEvent',
	'scheduleEvent', 'spawnBlock', 'getBlockArg']
const THREAD_ASYNC_CONDITIONAL_METHODS_SIGNATURE = ['yieldUntil', 'waitUntil',
	'waitWhile']
const THREAD_DEFININITON_SIGNATURE = 'THREAD'

function textOutputGenerator(node) {
	return node.text
}
function emptyGenerator() {
	return ''
}
function passThroughGenerator(node, spacer = '') {
	let { children } = node
	children = removeChildrenOfType(children, 'comment')
	let code = ''
	code += children.map(generate).join(spacer)
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
GENERATORS['::'] = textOutputGenerator
GENERATORS['.'] = textOutputGenerator

GENERATORS['='] = textOutputGenerator
GENERATORS['*='] = textOutputGenerator
GENERATORS['/='] = textOutputGenerator
GENERATORS['%='] = textOutputGenerator
GENERATORS['+='] = textOutputGenerator
GENERATORS['-='] = textOutputGenerator
GENERATORS['<<='] = textOutputGenerator
GENERATORS['>>='] = textOutputGenerator
GENERATORS['&='] = textOutputGenerator
GENERATORS['^='] = textOutputGenerator
GENERATORS['|='] = textOutputGenerator
GENERATORS['+'] = textOutputGenerator
GENERATORS['-'] = textOutputGenerator
GENERATORS['*'] = textOutputGenerator
GENERATORS['/'] = textOutputGenerator
GENERATORS['%'] = textOutputGenerator
GENERATORS['^'] = textOutputGenerator
GENERATORS['&'] = textOutputGenerator
GENERATORS['|'] = textOutputGenerator
GENERATORS['~'] = textOutputGenerator
GENERATORS['!'] = textOutputGenerator
GENERATORS['='] = textOutputGenerator
GENERATORS['<'] = textOutputGenerator
GENERATORS['>'] = textOutputGenerator
GENERATORS['+='] = textOutputGenerator
GENERATORS['-='] = textOutputGenerator
GENERATORS['*='] = textOutputGenerator
GENERATORS['/='] = textOutputGenerator
GENERATORS['%='] = textOutputGenerator
GENERATORS['^='] = textOutputGenerator
GENERATORS['&='] = textOutputGenerator
GENERATORS['|='] = textOutputGenerator
GENERATORS['<<'] = textOutputGenerator
GENERATORS['>>'] = textOutputGenerator
GENERATORS['>>='] = textOutputGenerator
GENERATORS['<<='] = textOutputGenerator
GENERATORS['=='] = function equal() { return '===' }
GENERATORS['!='] = function different() { return '!==' }
GENERATORS['<='] = textOutputGenerator
GENERATORS['>='] = textOutputGenerator
GENERATORS['&&'] = textOutputGenerator
GENERATORS['||'] = textOutputGenerator
GENERATORS['++'] = textOutputGenerator
GENERATORS['--'] = textOutputGenerator
GENERATORS[','] = textOutputGenerator
GENERATORS['->*'] = textOutputGenerator
GENERATORS['->'] = textOutputGenerator
GENERATORS['()'] = textOutputGenerator
GENERATORS['[]'] = textOutputGenerator
GENERATORS['::'] = function namespaceSeparator() { return '.' }
GENERATORS.true = textOutputGenerator
GENERATORS.false = textOutputGenerator
GENERATORS.if = textOutputGenerator
GENERATORS.else = textOutputGenerator
GENERATORS.while = textOutputGenerator
GENERATORS.string_literal = textOutputGenerator
GENERATORS.char_literal = textOutputGenerator
GENERATORS.field_identifier = textOutputGenerator
GENERATORS.namespace_identifier = textOutputGenerator
GENERATORS.for = textOutputGenerator
GENERATORS.new = function newfn() { return 'new ' }
GENERATORS['#include'] = function include() { return 'import * from' }

GENERATORS.storage_class_specifier = emptyGenerator

GENERATORS.argument_list = passThroughGenerator
GENERATORS.function_declarator = passThroughGenerator
GENERATORS.parameter_list = passThroughGenerator
GENERATORS.translation_unit = passThroughGenerator
GENERATORS.initializer_list = passThroughGenerator
GENERATORS.field_expression = passThroughGenerator
GENERATORS.parenthesized_expression = passThroughGenerator
GENERATORS.binary_expression = passThroughGenerator
GENERATORS.assignment_expression = passThroughGenerator
GENERATORS.update_expression = passThroughGenerator
GENERATORS.unary_expression = passThroughGenerator
GENERATORS.subscript_expression = passThroughGenerator
GENERATORS.new_expression = passThroughGenerator
GENERATORS.scoped_identifier = passThroughGenerator
GENERATORS.if_statement = (node) => `${passThroughGenerator(node, ' ')}\n`

GENERATORS.call_expression = (node) => {
	let { children } = node
	children = removeChildrenOfType(children, 'comment')

	// special cases for thread methods
	if (childrenStartsWithExactTypes(children, ['identifier']) &&
		THREAD_METHODS_SIGNATURE.includes(children[0].text)) {
		// make a clone of the children array and of the argument_list child
		children = children.splice(0)
		let argument_list
		for (let i = 0; i < children.length; i++) {
			const child = children[i]
			if (child.type === 'argument_list') {
				argument_list = {
					type     : child.type,
					text     : child.text,
					children : child.children.splice(0)
				}
				children[i] = argument_list
				break
			}
		}
		// transform the first identifier from the argument list into a string_literal
		for (let i = 0; i < argument_list.children.length; i++) {
			const argument = argument_list.children[i]
			if (argument.type === 'identifier') {
				argument_list.children[i] = {
					type     : 'string_literal',
					text     : `"${argument.text}"`,
					children : [
						{ type : '"', text : '"' },
						{ type : '"', text : '"' },
					]
				}
				break
			}
		}
	}

	// special cases for thread methods with async conditionals
	if (childrenStartsWithExactTypes(children, ['identifier', 'argument_list']) &&
		THREAD_ASYNC_CONDITIONAL_METHODS_SIGNATURE.includes(children[0].text)) {
		const [identifier, argument_list] = children

		// remove parenthesis
		let parsedArgumentList = generate(argument_list)
		if (parsedArgumentList[0] === '(') {
			parsedArgumentList = parsedArgumentList.substring(1)
		}
		if (parsedArgumentList[parsedArgumentList.length - 1] === ')') {
			parsedArgumentList = parsedArgumentList.slice(0, -1)
		}
		return `await ${generate(identifier)}(async() => ${parsedArgumentList})`
	}

	let code = 'await '
	code += children.map(generate).join('')
	return code
}
GENERATORS.preproc_include = (node) => {
	let { children } = node
	children = removeChildrenOfType(children, 'comment')
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
	let { children } = node
	children = removeChildrenOfType(children, 'comment')
	const [function_declarator, compound_statement] = children.slice(-2)

	return `${generateWithType('thread_declarator', function_declarator)} = async function _thread_ () ${generate(compound_statement)}\n`
}
GENERATORS.thread_declarator = (node) => {
	let { children } = node
	children = removeChildrenOfType(children, 'comment')
	const [identifier, parameter_list] = children.slice(-2)

	const parameterListToKeyAccess = generate(parameter_list).replace('(', '[').replace(')', ']')
	return `${generate(identifier)}${parameterListToKeyAccess}`
}
GENERATORS.function_definition = (node) => {
	let { children } = node
	children = removeChildrenOfType(children, 'comment')
	const [function_declarator, compound_statement] = children.slice(-2)

	const isThread = function_declarator?.children?.[0]?.text === THREAD_DEFININITON_SIGNATURE
	if (isThread) {
		return generateWithType('thread_definition', node)
	}
	return `async function ${[function_declarator, compound_statement].map(generate).join(' ')}\n`
}
GENERATORS.declaration = (node) => {
	let { children } = node
	children = removeChildrenOfType(children, 'comment')
	children = removeChildrenOfType(children, 'storage_class_specifier')

	const resolvedType = 'let'
	let resolvedIndentifier
	let resolvedConstructur
	let resolvedSemi = ''

	const semi = children.slice(-1).pop()
	if (semi && semi.type === ';') {
		resolvedSemi = generate(semi)
		resolvedSemi += resolvedSemi ? '\n' : ''
	}

	/**
	* int a;
	* Custom b;
	* auto c;
	*/
	if (areChildrenOfExactTypes(children, ['primitive_type', 'identifier', ';']) ||
		areChildrenOfExactTypes(children, ['type_identifier', 'identifier', ';']) ||
		areChildrenOfExactTypes(children, ['auto', 'identifier', ';'])) {
		const [type, identifier] = children
		resolvedIndentifier = generate(identifier)
		resolvedConstructur = `new ${generate(type)}()`
	}

	/**
	* int a,b,c;
	* Custom a,b,c;
	*/
	if (childrenStartsWithExactTypes(children, ['primitive_type', 'identifier', ',']) ||
		childrenStartsWithExactTypes(children, ['type_identifier', 'identifier', ',']) ||
		childrenStartsWithExactTypes(children, ['auto', 'identifier', ','])) {
		// This is special case where we will convert the single line
		// declaration into multiple lines of initialization
		const [type] = children
		const [maybeSemi] = children.slice(-1)
		const generatedNodes = children
			.filter((child) => child.type === 'identifier')
			.map(child => ({
				type     : 'declaration',
				children : [type, child, maybeSemi]
			}))
		return generatedNodes.map(generate).join('')
	}

	/**
	* Vector<Type> a;
	*/
	if (areChildrenOfExactTypes(children, ['template_type', 'identifier', ';'])) {
		const [template_type, identifier] = children
		resolvedIndentifier = generate(identifier)
		resolvedConstructur = `new ${generate(template_type)}()`
	}

	/**
	* int a[3];
	* int a[];
	* Custom b[3];
	* Custom b[];
	* auto c[3];
	* auto c[];
	*/
	if (childrenStartsWithExactTypes(children, ['primitive_type', 'array_declarator']) ||
		childrenStartsWithExactTypes(children, ['type_identifier', 'array_declarator']) ||
		childrenStartsWithExactTypes(children, ['auto', 'array_declarator'])) {
		const [, array_declarator] = children
		const [identifier] = array_declarator.children
		let count = ''
		if (childrenEndsWithExactTypes(array_declarator.children, ['[', 'number_literal', ']'])) {
			const [, number_literal] = array_declarator.children.slice(-3)
			count = generate(number_literal)
		}
		resolvedIndentifier = generate(identifier)
		resolvedConstructur = `new Array(${count})`
	}

	/**
	* Custom a(2,45);
	* int b = 1;
	* int c = fn();
	* char d[5] = "abcde";
	* string e = "abcde";
	*/
	if (childrenStartsWithExactTypes(children, ['primitive_type', 'init_declarator']) ||
		childrenStartsWithExactTypes(children, ['type_identifier', 'init_declarator'])) {
		const [type, init_declarator] = children

		/**
		* Custom a(2,45);
		*/
		if (childrenStartsWithExactTypes(init_declarator.children, ['identifier', 'argument_list'])) {
			const [identifier, argument_list] = init_declarator.children
			resolvedIndentifier = generate(identifier)
			resolvedConstructur = `new ${generate(type)}${generate(argument_list)}`
		}

		/**
		* int b = 1;
		* int c = fn();
		* string e = "abcde";
		*/
		if (childrenStartsWithExactTypes(init_declarator.children, ['identifier', '='])) {
			const [identifier,, last] = init_declarator.children
			resolvedIndentifier = generate(identifier)
			resolvedConstructur = generate(last)
		}

		/**
		* int n[]= {1,2,3};
		* char d[5] = "abcde";
		*/
		if (childrenStartsWithExactTypes(init_declarator.children, ['array_declarator', '='])) {
			const [array_declarator] = init_declarator.children
			const [identifier] = array_declarator.children
			resolvedIndentifier = generate(identifier)
			/**
			* int n[]= {1,2,3};
			*/
			if (areChildrenOfExactTypes(init_declarator.children, ['array_declarator', '=', 'initializer_list'])) {
				const [,, initializer_list] = init_declarator.children
				resolvedConstructur = generate(initializer_list).split('{').join('[').split('}').join(']')
			}
			/**
			* char d[5] = "abcde";
			*/
			if (areChildrenOfExactTypes(init_declarator.children, ['array_declarator', '=', 'string_literal'])) {
				const [,, string_literal] = init_declarator.children
				resolvedConstructur = generate(string_literal)
			}
		}
	}

	/**
	* auto a = Custom(1,2);
	*/
	if (childrenStartsWithExactTypes(children, ['auto', 'init_declarator'])) {
		const [, init_declarator] = children
		const [identifier] = init_declarator.children
		resolvedIndentifier = generate(identifier)
		if (areChildrenOfExactTypes(init_declarator.children, ['identifier', '=', 'call_expression'])) {
			const [,, call_expression] = init_declarator.children
			resolvedConstructur = `new ${generate(call_expression)}`
		}
	}

	return `${resolvedType} ${resolvedIndentifier} = ${resolvedConstructur}${resolvedSemi}`
}
GENERATORS.identifier = (node) => {
	const { text } = node
	let code = ''
	code += text
	return code
}
GENERATORS.compound_statement = (node) => {
	let { children } = node
	children = removeChildrenOfType(children, 'comment')
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
	let { children } = node
	children = removeChildrenOfType(children, 'comment')
	const [, semiColon] = children
	const maybeNewLine = semiColon ? '\n' : ''
	let code = ''
	code += children.map(generate).join('')
	code += maybeNewLine
	return code
}
GENERATORS.parameter_declaration = (node) => {
	let { children } = node
	children = removeChildrenOfType(children, 'comment')
	const [type, identifier] = children
	return identifier ? generate(identifier) : `'${type.text}'`
}
GENERATORS.while_statement = (node) => {
	let { children } = node
	children = removeChildrenOfType(children, 'comment')

	if (areChildrenOfExactTypes(children, ['while', 'parenthesized_expression', 'compound_statement'])) {
		const [, parenthesized_expression, compound_statement] = children
		return `await createWhileLoop(async() => ${generate(parenthesized_expression)}, async() => ${generate(compound_statement)})\n`
	}

	return passThroughGenerator(node)
}
GENERATORS.do_statement = (node) => {
	let { children } = node
	children = removeChildrenOfType(children, 'comment')

	if (areChildrenOfExactTypes(children, ['do', 'compound_statement', 'while', 'parenthesized_expression', ';'])) {
		const [, compound_statement,, parenthesized_expression] = children
		return `await createWhileLoop(async() => ${generate(parenthesized_expression)}, async() => ${generate(compound_statement)}, true)\n`
	}

	return passThroughGenerator(node)
}
GENERATORS.for_statement = (node) => {
	let { children } = node
	children = removeChildrenOfType(children, 'comment')

	const [compound_statement] = children.slice(-1)

	const init = []
	const condition = []
	const update = []

	let parseState = 'init'
	let tempStructurehildren = children.slice(2)

	if (childrenStartsWithExactTypes(children, ['for', '(', 'declaration'])) {
		const [,, declaration] = children
		init.push(declaration)
		tempStructurehildren = children.slice(3)
		parseState = 'condition'
	}
	for (let i = 0; i < tempStructurehildren.length; i++) {
		const child = tempStructurehildren[i]
		if (child.type === ')') {
			break
		}
		switch (parseState) {
			case 'init':
				if (child.type === ';') {
					parseState = 'condition'
					break
				}
				init.push(child)
				break
			case 'condition':
				if (child.type === ';') {
					parseState = 'update'
					break
				}
				condition.push(child)
				break
			case 'update':
				if (child.type === ';') {
					parseState = 'end'
					break
				}
				update.push(child)
				break
			default:
		}
	}
	const initString = init.map(generate).join('')
	const conditionString = condition.map(generate).join('')
	const updateString = update.map(generate).join('')
	const initFn = initString ? `async() => ${initString}` : '() => {}'
	const conditionFn = conditionString ? `async() => ${conditionString}` : '() => true'
	const updateFn = updateString ? `async() => ${updateString}` : '() => {}'
	return `await createForLoop(${initFn}, ${conditionFn}, ${updateFn}, async() => ${generate(compound_statement)})\n`
}
GENERATORS.cast_expression = (node) => {
	let { children } = node
	children = removeChildrenOfType(children, 'comment')
	return children.slice(3).map(generate).join('')
}
// Type
GENERATORS.primitive_type = (node) => {
	const { text } = node

	switch (text) {
		case 'bool':
			return 'Boolean'
		case 'char':
		case 'int':
		case 'float':
		case 'double':
		case 'int8_t':
		case 'int16_t':
		case 'int32_t':
		case 'int64_t':
		case 'uint8_t':
		case 'uint16_t':
		case 'uint32_t':
		case 'uint64_t':
		case 'char8_t':
		case 'char16_t':
		case 'char32_t':
		case 'char64_t':
		case 'size_t':
		case 'ssize_t':
		case 'intptr_t':
		case 'uintptr_t':
		case 'charptr_t':
			return 'Number'
		case 'void':
		default:
			return 'Object'
	}
}
GENERATORS.template_type = (node) => {
	const { text } = node

	if (text.indexOf('Vector<') === 0) {
		return 'Array'
	}
	return text.replace('<', '_').replace('>', '').split(',').join('_')
}
GENERATORS.type_identifier = (node) => {
	const { text } = node

	switch (text) {
		case 'string':
			return 'String'
		case 'Vecor':
			return 'Array'
		default:
			return text
	}
}
GENERATORS.auto = () => 'Object'

function removeChildrenOfType(children, type) {
	return children.filter(c => c.type !== type)
}
function areChildrenOfExactTypes(children, types = []) {
	if (children.length !== types.length) {
		return false
	}
	for (let i = 0; i < children.length; i++) {
		if (children[i].type !== types[i]) {
			return false
		}
	}
	return true
}
function childrenStartsWithExactTypes(children, types = []) {
	for (let i = 0; i < children.length; i++) {
		if (i === types.length) {
			return true
		}
		if (children[i].type !== types[i]) {
			return false
		}
	}
	return true
}
function childrenEndsWithExactTypes(children, types = []) {
	if (types.length > children.length) {
		return false
	}
	const lastChildren = children.slice(-1 * types.length)
	return areChildrenOfExactTypes(lastChildren, types)
}

function generate(node) {
	if (!node) {
		return '/**error: undefined node**/'
	}
	if (!GENERATORS[node.type]) {
		return `/**${node.type}**/`
	}
	return GENERATORS[node.type](node)
}
function generateWithType(type, node) {
	if (!GENERATORS[type]) {
		return `/**${node.type}**/`
	}
	return GENERATORS[type](node)
}

function generateSimplifiedNode(nativeNode) {
	const { type, text, children } = nativeNode
	const simplifiedNode = {
		type,
		text,
		children : [],
	}
	// For each doesn't work here (ios crazy bug)
	for (let i = 0; i < children.length; i++) {
		simplifiedNode.children.push(generateSimplifiedNode(children[i]))
	}
	return simplifiedNode
}
function iteratorLog(cursor) {
	console.groupCollapsed(cursor.nodeType)
	console.log(cursor.nodeText)
	if (cursor.gotoFirstChild()) {
		iteratorLog(cursor)
	}
	console.groupEnd()
	if (cursor.gotoNextSibling()) {
		iteratorLog(cursor)
	} else {
		cursor.gotoParent()
	}
}
function recursiveLog(node) {
	console.groupCollapsed(node.type)
	console.log(node.text)
	removeChildrenOfType(node.children, 'comment').forEach(recursiveLog)
	console.groupEnd()
}

function generateJsfromCppAst(tree) {
	const rootNode = generateSimplifiedNode(tree.rootNode)
	debugger
	const js = generate(rootNode)
	// console.groupCollapsed('C++ to JS')
	// console.groupCollapsed('Parsed C++')
	// recursiveLog(rootNode)
	// iteratorLog(tree.walk())
	// console.groupEnd()
	// console.groupCollapsed('Generated JS')
	// console.log(js)
	// console.groupEnd()
	// console.groupEnd()
	return js
}
export default generateJsfromCppAst
/* eslint-enable camelcase */
