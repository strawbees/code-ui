import instanceNodeSelector from 'src/editors/flow/selectors/instanceNodeSelector'
import parameterValueParsedSanitisedSelector from 'src/editors/flow/selectors/parameterValueParsedSanitisedSelector'
import parameterNumItemsSelector from 'src/editors/flow/selectors/parameterNumItemsSelector'

const genereateCode = (source, state) => {
	source = source || []

	// This is hack... as our selectors operate on state.flowEditor.source,
	// but we want to be able to generate code also for programs not currently
	// loaded on the editor, we inject the source in the state (making a copy).
	// In case the state shape changes, this will break! :(
	state = {
		...state,
		flowEditor : {
			...state.flowEditor,
			source
		}
	}
	// Sort nodes by input > brains > output
	const sortedSource = source.slice(0).sort((instanceA, instanceB) => {
		const nodeA = instanceNodeSelector()(state, { id : instanceA.id })
		const nodeB = instanceNodeSelector()(state, { id : instanceB.id })
		if (!nodeA || !nodeB) {
			return 0
		}
		const categoryA = nodeA.taxonomy.category
		const categoryB = nodeB.taxonomy.category
		if (categoryA === 'input' && categoryB !== 'input') {
			return -1
		}
		if (categoryB === 'input' && categoryA !== 'input') {
			return 1
		}
		if (categoryA === 'brains' && categoryB !== 'brains') {
			return -1
		}
		if (categoryB === 'brains' && categoryA !== 'brains') {
			return 1
		}
		if (categoryA === 'output' && categoryB !== 'output') {
			return -1
		}
		if (categoryB === 'output' && categoryA !== 'output') {
			return 1
		}
		if (instanceA.name < instanceB.name) {
			return -1
		}
		if (instanceB.name < instanceA.name) {
			return 1
		}
		return 0
	})

	let code = ''
	// includes
	code += '#include "Quirkbot.h"\n'
	code += '\n'
	// declares
	code += sortedSource.map(instance => {
		const node = instanceNodeSelector()(state, { id : instance.id })
		if (!node) {
			return ''
		}
		return `${node.code} ${instance.name};`
	}).join('\n')
	code += '\n'
	code += '\n'
	// setup
	code += 'void setup(){\n'
	// connections
	code += sortedSource.map(instance => {
		const node = instanceNodeSelector()(state, { id : instance.id })
		if (!node || !node.parameters) {
			return null
		}
		return node.parameters.map(parameter => {
			let c = ''
			if (!parameter.multiple) {
				const value = parameterValueParsedSanitisedSelector()(state, { id : parameter.id, instanceId : instance.id })
				c += `\t${instance.name}.${parameter.code}`
				if (value.type === 'OUTLET') {
					c += `.connect(${value.code});`
				} else {
					c += ` = ${value.code};`
				}
			} else {
				const numItems = parameterNumItemsSelector()(state, { id : parameter.id, instanceId : instance.id })
				c = [...Array(numItems)].map((_, num) => {
					const value = parameterValueParsedSanitisedSelector()(state, { id : `${parameter.id}.${num}`, instanceId : instance.id })
					let cc = ''
					cc += `\t${instance.name}.${parameter.code}[${num}]`
					if (value.type === 'OUTLET') {
						cc += `.connect(${value.code});`
					} else {
						cc += `.set(${value.code});`
					}
					return cc
				}).join('\n')
			}
			return c
		}).join('\n')
	}).filter(t => t).join('\n\n')
	code += '\n'
	code += '}\n'
	code += '\n'
	// loop
	code += 'void loop(){\n'
	code += '\n'
	code += '}\n'

	return code
}

export default genereateCode
